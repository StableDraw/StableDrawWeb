using Nuke.Common;
using Nuke.Common.Git;
using Nuke.Common.IO;
using Nuke.Common.Tooling;
using Nuke.Common.Tools.DotNet;
using Nuke.Common.Tools.Npm;
using Nuke.Common.Tools.PowerShell;
using System.IO;

class Build : NukeBuild
{
    /// Support plugins are available for:
    ///   - JetBrains ReSharper        https://nuke.build/resharper
    ///   - JetBrains Rider            https://nuke.build/rider
    ///   - Microsoft VisualStudio     https://nuke.build/visualstudio
    ///   - Microsoft VSCode           https://nuke.build/vscode

    public static int Main() => Execute<Build>(x => x.Compile);

    [Parameter("Configuration to build - Default is 'Debug' (local) or 'Release' (server)")]
    readonly Configuration Configuration = IsLocalBuild ? Configuration.Debug : Configuration.Release;

    [Parameter("Solution to build - Default is 'Client'")]
    readonly Solution Solution = Solution.Client;

    [Parameter("Path to ClientApp directory")]
    readonly string FrontendProjectDirectory;
    
    [Parameter("Path to Client directory")]
    readonly string ClientDirectory;

    [Parameter("Path to Docker files")]
    readonly string DockerFileDirectory;

    [Parameter("Path to publish project")]
    readonly string ProjectPublishDirectory;

    AbsolutePath SolutionDirectory => RootDirectory / Solution;

    [GitRepository]
    readonly GitRepository GitRepository;

    Target Clean => _ => _
       .Description($"Cleaning Project.")
       .Before(Restore)
       .Executes(() =>
       {
           DotNetTasks.DotNetClean(c => c.SetProject(SolutionDirectory));
       });
    Target Restore => _ => _
        .Description($"Restoring Project Dependencies.")
        .DependsOn(Clean)
        .Executes(() =>
        {
            DotNetTasks.DotNetRestore(
                r => r.SetProjectFile(SolutionDirectory));
        });

    Target Compile => _ => _
        .Description($"Building Project with the version.")
        .DependsOn(Restore)
        .Executes(() =>
        {
            DotNetTasks.DotNetBuild(b => b
                .SetProjectFile(SolutionDirectory)
                .SetConfiguration(Configuration)
                .EnableNoRestore());
        });

    Target DatabaseUpdate => _ => _
        .Description("Database update command")
        .Executes(() =>
        {
            if (Configuration == Configuration.Release)
            {
                PowerShellTasks.PowerShell(setting => setting
                    .SetProcessWorkingDirectory(@$"{RootDirectory}{Directory.GetParent(Solution)}")
                    .SetCommand("dotnet ef migrations script"));
            }
            else
            {
                PowerShellTasks.PowerShell(setting => setting
                    .SetProcessWorkingDirectory(@$"{RootDirectory}{ClientDirectory}")
                    .SetCommand("dotnet ef database update"));
            }
        });

    Target DockerBuild => _ => _
        .Description("Build rabbitMQ plugin")
        .Executes(() =>
        {
            PowerShellTasks.PowerShell(setting => setting
                .SetProcessWorkingDirectory(@$"{RootDirectory}{DockerFileDirectory}")
                .SetCommand(@"docker build ."));
        });
    
    Target DockerCompose => _ => _
        .Description("Docker compose up")
        .Executes(() =>
        {
            PowerShellTasks.PowerShell(setting => setting
                .SetProcessWorkingDirectory(@$"{RootDirectory}{DockerFileDirectory}")
                .SetCommand("docker compose up"));
        });

    // Does an npm install on the specified directory
    Target NpmInstall => _ => _
        .Executes(() =>
        {
            NpmTasks.NpmInstall(settings =>
                settings
                    .EnableProcessLogOutput()
                    .SetProcessWorkingDirectory(@$"{RootDirectory}{FrontendProjectDirectory}"));
        });

    // Does an npm run build on the specified directory
    Target BuildFrontend => _ => _
        .DependsOn(NpmInstall)
        .Executes(() =>
        {
            NpmTasks.NpmRun(s => s
                .SetProcessWorkingDirectory(@$"{RootDirectory}{FrontendProjectDirectory}")
                .SetCommand("build"));
        });


    Target Publish => _ => _
        .Description("Publish Project")
        .DependsOn(Compile)
        .Executes(() =>
        {
            DotNetTasks.DotNetPublish(settings =>
                settings.SetProcessWorkingDirectory(ProjectPublishDirectory));
        });

}

using Nuke.Common;
using Nuke.Common.Git;
using Nuke.Common.IO;
using Nuke.Common.Tooling;
using Nuke.Common.Tools.DotNet;
using Nuke.Common.Tools.GitVersion;
using Nuke.Common.Tools.Npm;
using Nuke.Common.Tools.PowerShell;
using System;

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

    AbsolutePath FD => RootDirectory / FrontendProjectDirectory;

    [GitVersion]
    readonly GitVersion GitVersion;

    [GitRepository]
    readonly GitRepository GitRepository;

    Target Clean => _ => _
       .Description($"Cleaning Project.")
       .Before(Restore)
       .Executes(() =>
       {
           DotNetTasks.DotNetClean(c => c.SetProject(Solution));
       });
    Target Restore => _ => _
        .Description($"Restoring Project Dependencies.")
        .DependsOn(Clean)
        .Executes(() =>
        {
            DotNetTasks.DotNetRestore(
                r => r.SetProjectFile(Solution));
        });

    Target Compile => _ => _
        .Description($"Building Project with the version.")
        .DependsOn(Restore)
        .Triggers(DatabaseUpdate, NpmInstall)
        .Executes(() =>
        {
            DotNetTasks.DotNetBuild(b => b
                .SetProjectFile(Solution)
                .SetConfiguration(Configuration)
                //.SetVersion(GitVersion.NuGetVersionV2)
                //.SetAssemblyVersion(GitVersion.AssemblySemVer)
                //.SetInformationalVersion(GitVersion.InformationalVersion)
                //.SetFileVersion(GitVersion.AssemblySemFileVer)
                .EnableNoRestore());
        });

    Target DatabaseUpdate => _ => _
        .Description("Client database update command")
        .Executes(() =>
        {
            PowerShellTasks.PowerShell(setting => setting
            .SetProcessWorkingDirectory(@$"{RootDirectory}\Client")
            .SetCommand("dotnet ef database update"));
        });

    Target DockerCompose => _ => _
        .Description("RabbitMq and MinIO compose up")
        .Executes(() =>
        {
            PowerShellTasks.PowerShell(setting => setting
                .SetProcessWorkingDirectory(@$"{RootDirectory}\manifestos")
                .SetCommand(@"docker build ."));

            PowerShellTasks.PowerShell(setting => setting
                .SetProcessWorkingDirectory(@$"{RootDirectory}\manifestos")
                .SetCommand("docker compose up"));
        });

    // Does an npm install on the specified directory
    Target NpmInstall => _ => _
        //.Triggers(BuildFrontend)
        .Executes(() =>
        {
            //Console.WriteLine(FD.ToString());
            NpmTasks.NpmInstall(settings =>
                settings
                    .EnableProcessLogOutput()
                    .SetProcessWorkingDirectory(@$"{RootDirectory}\Client\ClientApp"));//@$"{RootDirectory}\Client\ClientApp"
        });

    // Does an npm run build on the specified directory
    Target BuildFrontend => _ => _
        .DependsOn(NpmInstall)
        .Executes(() =>
        {
            NpmTasks.NpmRun(s => s
                .SetProcessWorkingDirectory(@$"{RootDirectory}\Client\ClientApp")
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

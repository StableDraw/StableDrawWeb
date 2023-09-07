using System;
using System.Linq;
using Nuke.Common;
using Nuke.Common.CI;
using Nuke.Common.Execution;
using Nuke.Common.IO;
using Nuke.Common.ProjectModel;
using Nuke.Common.Tooling;
using Nuke.Common.Tools.DotNet;
using Nuke.Common.Utilities.Collections;
using static Nuke.Common.EnvironmentInfo;
using static Nuke.Common.IO.FileSystemTasks;
using static Nuke.Common.IO.PathConstruction;
using static Nuke.Common.Tools.DotNet.DotNetTasks;

class Build : NukeBuild
{
    /// Support plugins are available for:
    ///   - JetBrains ReSharper        https://nuke.build/resharper
    ///   - JetBrains Rider            https://nuke.build/rider
    ///   - Microsoft VisualStudio     https://nuke.build/visualstudio
    ///   - Microsoft VSCode           https://nuke.build/vscode

    public static int Main () => Execute<Build>(x => x.Compile);

    [Parameter("Configuration to build - Default is 'Debug' (local) or 'Release' (server)")]
    readonly Configuration Configuration = Configuration.Debug;// : Configuration.Release;

    [Solution] readonly Solution SDSolution;
    [Solution] readonly Solution CLISolution;
    [Parameter] readonly bool IgnoreFailedSources;
    AbsolutePath CLIDebugOutputDirectory => RootDirectory / "builds/Debug/CLI";
    AbsolutePath CLIReleaseOutputDirectory => RootDirectory / "builds/Release/CLI";
    AbsolutePath SDDebugOutputDirectory => RootDirectory / "builds/Debug/StableDraw";
    AbsolutePath SDReleaseOutputDirectory => RootDirectory / "builds/Release/StableDraw";

    Target Clean => _ => _
        .Before(Restore)
        .Executes(() =>
        {
            CLIDebugOutputDirectory.GlobDirectories("**/bin", "**/obj").ForEach(DeleteDirectory);
            CLIReleaseOutputDirectory.GlobDirectories("**/bin", "**/obj").ForEach(DeleteDirectory);
            SDDebugOutputDirectory.GlobDirectories("**/bin", "**/obj").ForEach(DeleteDirectory);
            SDReleaseOutputDirectory.GlobDirectories("**/bin", "**/obj").ForEach(DeleteDirectory);

        });

    Target Restore => _ => _
        .Executes(() =>
        {

            DotNetRestore(_ => _
                                .SetProjectFile(CLISolution)
                                .SetIgnoreFailedSources(IgnoreFailedSources));
            DotNetRestore(_ => _
                                .SetProjectFile(SDSolution)
                                .SetIgnoreFailedSources(IgnoreFailedSources));
        });

    Target Compile => _ => _
        .DependsOn(Restore)
        .Executes(() =>
        {
            DotNetPublish(_ => _
                                .SetProject(CLISolution)
                                .SetConfiguration(Configuration.Debug)
                                .SetOutput(CLIDebugOutputDirectory));
            DotNetPublish(_ => _
                                .SetProject(SDSolution)
                                .SetConfiguration(Configuration.Debug)
                                .SetOutput(SDDebugOutputDirectory));
        });
    Target Release => _ => _
        .After(Restore)
        .Executes(() =>
        {

            DotNetRestore(_ => _
                               .SetProjectFile(CLISolution)
                               .SetIgnoreFailedSources(IgnoreFailedSources));
            DotNetRestore(_ => _
                                .SetProjectFile(SDSolution)
                                .SetIgnoreFailedSources(IgnoreFailedSources));

            DotNetPublish(_ => _
                                .SetProject(CLISolution)
                                .SetConfiguration(Configuration.Release)
                                .SetOutput(CLIReleaseOutputDirectory));
            DotNetPublish(_ => _
                                .SetProject(SDSolution)
                                .SetConfiguration(Configuration.Release)
                                .SetOutput(SDReleaseOutputDirectory));
        });

}

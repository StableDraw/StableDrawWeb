using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Nuke.Common;
using Nuke.Common.ChangeLog;
using Nuke.Common.CI;
using Nuke.Common.CI.GitHubActions;
using Nuke.Common.Execution;
using Nuke.Common.Git;
using Nuke.Common.IO;
using Nuke.Common.ProjectModel;
using Nuke.Common.Tooling;
using Nuke.Common.Tools.DotNet;
using Nuke.Common.Tools.GitHub;
using Nuke.Common.Tools.GitVersion;
using Nuke.Common.Tools.Npm;
using Nuke.Common.Utilities.Collections;
using Octokit;
using Octokit.Internal;
using static Nuke.Common.EnvironmentInfo;
using static Nuke.Common.IO.FileSystemTasks;
using static Nuke.Common.IO.PathConstruction;

[GitHubActions("continuous",
    GitHubActionsImage.UbuntuLatest,
    AutoGenerate = false,
    FetchDepth = 0,
    OnPushBranches = new[] 
    {
        "main", 
        "dev",
        "releases/**"
    },
    OnPullRequestBranches = new[] 
    {
        "releases/**" 
    },
    InvokedTargets = new[]
    {
        nameof(Pack),
    },
    EnableGitHubToken = true,
    ImportSecrets = new[] 
    { 
        nameof(MyGetApiKey), 
        nameof(NuGetApiKey) 
    }
)]
class Build : NukeBuild
{
    /// Support plugins are available for:
    ///   - JetBrains ReSharper        https://nuke.build/resharper
    ///   - JetBrains Rider            https://nuke.build/rider
    ///   - Microsoft VisualStudio     https://nuke.build/visualstudio
    ///   - Microsoft VSCode           https://nuke.build/vscode

    public static int Main () => Execute<Build>(x => x.Compile);

    [Nuke.Common.Parameter("Configuration to build - Default is 'Debug' (local) or 'Release' (server)")]
    readonly Configuration Configuration = IsLocalBuild ? Configuration.Debug : Configuration.Release;

    [Nuke.Common.Parameter("Solution to build - Default is 'Client'")] 
    readonly Solution Solution = Solution.Client;

    [Nuke.Common.Parameter("Path to ClientApp directory")] 
    readonly string FrontendProjectDirectory;

    [Nuke.Common.Parameter("Token auth for npm")] 
    readonly string NodeAuthToken;
    
    [Nuke.Common.Parameter("MyGet Feed Url for Public Access of Pre Releases")]
    readonly string MyGetNugetFeed;
    [Nuke.Common.Parameter("MyGet Api Key"), Secret]
    readonly string MyGetApiKey;

    [Nuke.Common.Parameter("Nuget Feed Url for Public Access of Pre Releases")]
    readonly string NugetFeed;
    [Nuke.Common.Parameter("Nuget Api Key"), Secret]
    readonly string NuGetApiKey;

    [Nuke.Common.Parameter("Copyright Details")]
    readonly string Copyright;

    [Nuke.Common.Parameter("Artifacts Type")]
    readonly string ArtifactsType;

    [Nuke.Common.Parameter("Excluded Artifacts Type")]
    readonly string ExcludedArtifactsType;

    [GitVersion]
    readonly GitVersion GitVersion;

    [GitRepository]
    readonly GitRepository GitRepository;
    
    [Nuke.Common.Parameter("Path")]
    static readonly string Path;
    
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

    Target Publish => _ => _
        .Description("Publish Project")
        .DependsOn(Compile)
        .Executes(() =>
        {
            DotNetTasks.DotNetPublish(p => p.SetProje);
        });

    // Target Pack => _ => _
    // .Description($"Packing Project with the version.")
    // .Requires(() => Configuration.Equals(Configuration.Release))
    // .Produces(ArtifactsDirectory / ArtifactsType)
    // .DependsOn(Compile)
    // //.Triggers(PublishToGithub, PublishToMyGet, PublishToNuGet)
    // .Executes(() =>
    // {
    //     DotNetTasks.DotNetPack(p =>
    //         p
    //             .SetProject(Solution)
    //             .SetConfiguration(Configuration)
    //             .SetOutputDirectory(ArtifactsDirectory)
    //             .EnableNoBuild()
    //             .EnableNoRestore()
    //             .SetCopyright(Copyright)
    //             .SetVersion(GitVersion.NuGetVersionV2)
    //             .SetAssemblyVersion(GitVersion.AssemblySemVer)
    //             .SetInformationalVersion(GitVersion.InformationalVersion)
    //             .SetFileVersion(GitVersion.AssemblySemFileVer));
    // });
    //
    // Target CreateRelease => _ => _
    //    .Description($"Creating release for the publishable version.")
    //    .Requires(() => Configuration.Equals(Configuration.Release))
    //    .OnlyWhenStatic(() => GitRepository.IsOnMainOrMasterBranch() || GitRepository.IsOnReleaseBranch())
    //    .Executes(async () =>
    //    {
    //        var credentials = new Credentials(GitHubActions.Token);
    //        GitHubTasks.GitHubClient = new GitHubClient(new ProductHeaderValue(nameof(NukeBuild)),
    //            new InMemoryCredentialStore(credentials));
    //
    //        var (owner, name) = (GitRepository.GetGitHubOwner(), GitRepository.GetGitHubName());
    //
    //        var releaseTag = GitVersion.NuGetVersionV2;
    //        var changeLogSectionEntries = ChangelogTasks.ExtractChangelogSectionNotes(ChangeLogFile);
    //        var latestChangeLog = changeLogSectionEntries
    //            .Aggregate((c, n) => c + Environment.NewLine + n);
    //
    //        var newRelease = new NewRelease(releaseTag)
    //        {
    //            TargetCommitish = GitVersion.Sha,
    //            Draft = true,
    //            Name = $"v{releaseTag}",
    //            Prerelease = !string.IsNullOrEmpty(GitVersion.PreReleaseTag),
    //            Body = latestChangeLog
    //        };
    //
    //        var createdRelease = await GitHubTasks
    //                                    .GitHubClient
    //                                    .Repository
    //                                    .Release.Create(owner, name, newRelease);
    //
    //        GlobFiles(ArtifactsDirectory, ArtifactsType)
    //           .Where(x => !x.EndsWith(ExcludedArtifactsType))
    //           .ForEach(async x => await UploadReleaseAssetToGithub(createdRelease, x));
    //
    //        await GitHubTasks
    //                   .GitHubClient
    //                   .Repository
    //                   .Release
    //           .Edit(owner, name, createdRelease.Id, new ReleaseUpdate { Draft = false });
    //    });
    //
    //
    // private static async Task UploadReleaseAssetToGithub(Release release, string asset)
    // {
    //     await using var artifactStream = File.OpenRead(asset);
    //     var fileName = Path.GetFileName(asset);
    //     var assetUpload = new ReleaseAssetUpload
    //     {
    //         FileName = fileName,
    //         ContentType = PackageContentType,
    //         RawData = artifactStream,
    //     };
    //     await GitHubTasks.GitHubClient.Repository.Release.UploadAsset(release, assetUpload);
    // }
    
    // Does an npm install on the specified directory
    Target NpmInstall => _ => _
        .Executes(() =>
        {
            NpmTasks.NpmCi(s =>
            {
                s = s.SetProcessWorkingDirectory(FrontendProjectDirectory);
                if (IsServerBuild && !string.IsNullOrWhiteSpace(NodeAuthToken))
                {
                    // token required for accessing private npm server
                    s = s.SetProcessEnvironmentVariable("NODE_AUTH_TOKEN", NodeAuthToken);
                }
                return s;
            });
        });
    // Does an npm run build on the specified directory
    public Target BuildFrontend => _ => _
        .DependsOn(NpmInstall)
        .Executes(() =>
        {
            NpmTasks.NpmRun(s => s
                .SetProcessWorkingDirectory(FrontendProjectDirectory)
                .SetCommand("build"));
        });
}

set list=UserStatus UserTasks AllTasks ResultCaptions AllResults AllCaptions ResultImgs AllImgs ResultParams
set ctx=CLI.Data.ApplicationDbContext
for %%i in (%list%) do (
    @RD /S /Q "Pages/"%%i
    @REM dotnet aspnet-codegenerator controller -name %%iController -m %%i -dc %ctx% --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries --databaseProvider sqlite -f
    dotnet aspnet-codegenerator razorpage -m %%i -dc %ctx% -udl -outDir Pages/%%i --referenceScriptLibraries --databaseProvider sqlite -f
)

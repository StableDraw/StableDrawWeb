mkdir CLI
Set-Location CLI
dotnet new react -au Individual
npm install --save react-helmet
npm i --save-dev @types/jquery
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL --version 7.0.4
dotnet add package MimeKit --version 4.0.0
dotnet add package Microsoft.TypeScript.MSBuild --version 5.1.1-rc
dotnet add package Microsoft.AspNetCore.Authentication.Google --version 7.0.5
dotnet add package MailKit --version 4.0.0
dotnet add package jquery.TypeScript.DefinitelyTyped --version 3.1.2
dotnet add package AspNetCore.ReCaptcha --version 1.7.0
Set-Location ..
Write-Output D|xcopy /H /Y /C /R /S Client_test\Areas CLI\Areas
Write-Output D|xcopy /H /Y /C /R /S Client_test\Migrations CLI\Migrations
Write-Output D|xcopy /H /Y /C /R /S Client_test\Pages CLI\Pages
Write-Output D|xcopy /H /Y /C /R /S Client_test\Services CLI\Services
Write-Output F|xcopy /H /Y /C /R /S Client_test\appsettings.Development.json CLI\appsettings.Development.json
Write-Output F|xcopy /H /Y /C /R /S Client_test\appsettings.json CLI\appsettings.json
Write-Output F|xcopy /H /Y /C /R /S Client_test\appsettings.Production.json CLI\appsettings.Production.json
Write-Output F|xcopy /H /Y /C /R /S Client_test\main.ts CLI\main.ts
Write-Output F|xcopy /H /Y /C /R /S Client_test\Program.cs CLI\Program.cs
Write-Output F|xcopy /H /Y /C /R /S Client_test\tsconfig.json CLI\tsconfig.json
Write-Output D|xcopy /H /Y /C /R /S Client_test\ClientApp\public CLI\ClientApp\public
Write-Output D|xcopy /H /Y /C /R /S Client_test\ClientApp\src CLI\ClientApp\src
Remove-Item Client_test -Force -Recurse
Rename-Item CLI Client_test
Set-Location Client_test
dotnet watch
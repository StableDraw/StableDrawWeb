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
Set-Location ..
Write-Output D|xcopy /H /Y /C /R /S Client\Areas CLI\Areas
Write-Output D|xcopy /H /Y /C /R /S Client\Migrations CLI\Migrations
Write-Output D|xcopy /H /Y /C /R /S Client\Pages CLI\Pages
Write-Output D|xcopy /H /Y /C /R /S Client\Services CLI\Services
Write-Output F|xcopy /H /Y /C /R /S Client\appsettings.Development.json CLI\appsettings.Development.json
Write-Output F|xcopy /H /Y /C /R /S Client\appsettings.json CLI\appsettings.json
Write-Output F|xcopy /H /Y /C /R /S Client\appsettings.Production.json CLI\appsettings.Production.json
Write-Output F|xcopy /H /Y /C /R /S Client\main.ts CLI\main.ts
Write-Output F|xcopy /H /Y /C /R /S Client\Program.cs CLI\Program.cs
Write-Output F|xcopy /H /Y /C /R /S Client\tsconfig.json CLI\tsconfig.json
Write-Output D|xcopy /H /Y /C /R /S Client\ClientApp\public CLI\ClientApp\public
Write-Output D|xcopy /H /Y /C /R /S Client\ClientApp\src CLI\ClientApp\src
Write-Output Y|Remove-Item /S Client_test
rename CLI Client_test
Set-Location Client_test
Write-Output Y|dotnet watch
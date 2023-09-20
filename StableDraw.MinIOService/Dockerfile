FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY "StableDraw.sln" "StableDraw.sln"
COPY "StableDraw.Contracts/StableDraw.Contracts.csproj" "StableDraw.Contracts/StableDraw.Contracts.csproj"
COPY "StableDraw.MinIOService/StableDraw.MinIOService.csproj" "StableDraw.MinIOService/StableDraw.MinIOService.csproj"
RUN dotnet restore "StableDraw.MinIOService/StableDraw.MinIOService.csproj"
COPY . .
WORKDIR /src/StableDraw.MinIOService
RUN dotnet publish -c Release -o /app
FROM build AS publish
FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "StableDraw.MinIOService.dll"]

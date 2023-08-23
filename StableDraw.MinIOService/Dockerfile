FROM mcr.microsoft.com/dotnet/runtime:7.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["StableDraw.MinIOService/StableDraw.MinIOService.csproj", "StableDraw.MinIOService/"]
RUN dotnet restore "StableDraw.MinIOService/StableDraw.MinIOService.csproj"
COPY . .
WORKDIR "/src/StableDraw.MinIOService"
RUN dotnet build "StableDraw.MinIOService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "StableDraw.MinIOService.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "StableDraw.MinIOService.dll"]

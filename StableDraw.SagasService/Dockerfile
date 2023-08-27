FROM mcr.microsoft.com/dotnet/runtime:7.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["StableDraw.SagasService/StableDraw.SagasService.csproj", "StableDraw.SagasService/"]
RUN dotnet restore "StableDraw.SagasService/StableDraw.SagasService.csproj"
COPY . .
WORKDIR "/src/StableDraw.SagasService"
RUN dotnet build "StableDraw.SagasService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "StableDraw.SagasService.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "StableDraw.SagasService.dll"]

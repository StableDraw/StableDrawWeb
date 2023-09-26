FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY "StableDraw.sln" "StableDraw.sln"
COPY "StableDraw.Contracts/StableDraw.Contracts.csproj" "StableDraw.Contracts/StableDraw.Contracts.csproj"
COPY "StableDraw.SagasService/StableDraw.SagasService.csproj" "StableDraw.SagasService/StableDraw.SagasService.csproj"
RUN dotnet restore "StableDraw.SagasService/StableDraw.SagasService.csproj"
COPY . .
WORKDIR /src/StableDraw.SagasService
RUN dotnet publish -c Release -o /app
FROM build AS publish
FROM base AS final
WORKDIR /app
COPY --from=publish /app .
COPY --from=build /src/StableDraw.SagasService/app.db /app
ENTRYPOINT ["dotnet", "StableDraw.SagasService.dll"]

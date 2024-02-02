ARG VERSION=8.0-alpine

# Estágio de compilação
FROM mcr.microsoft.com/dotnet/sdk:$VERSION AS build
WORKDIR /app

COPY ./*.sln .
COPY ./JwtAuthDemo/*.csproj ./JwtAuthDemo/
COPY ./JwtAuthDemo.IntegrationTests/*.csproj ./JwtAuthDemo.IntegrationTests/
RUN dotnet restore

COPY . .

WORKDIR /app/JwtAuthDemo.IntegrationTests
# RUN dotnet test --no-restore

WORKDIR /app/JwtAuthDemo
RUN dotnet publish -c Release -o /out --no-restore


# Estágio de tempo de execução
FROM mcr.microsoft.com/dotnet/aspnet:$VERSION AS runtime
WORKDIR /app
COPY --from=build /out ./

# Instalação do pacote libicu-dev
RUN apk add --no-cache icu-libs

ENTRYPOINT ["dotnet", "JwtAuthDemo.dll"]

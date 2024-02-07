ARG VERSION=8.0-alpine

# Estágio de compilação
FROM mcr.microsoft.com/dotnet/sdk:$VERSION AS build
WORKDIR /app

COPY ./*.sln .
COPY ./EmpresaAPI/*.csproj ./EmpresaAPI/
COPY ./EmpresaAPI.IntegrationTests/*.csproj ./EmpresaAPI.IntegrationTests/
RUN dotnet restore

COPY . .

WORKDIR /app/EmpresaAPI.IntegrationTests
# RUN dotnet test --no-restore

WORKDIR /app/EmpresaAPI
RUN dotnet publish -c Release -o /out --no-restore


# Estágio de tempo de execução
FROM mcr.microsoft.com/dotnet/aspnet:$VERSION AS runtime
WORKDIR /app
COPY --from=build /out ./

# Instalação do pacote libicu-dev
RUN apk add --no-cache icu-libs

ENTRYPOINT ["dotnet", "EmpresaAPI.dll"]

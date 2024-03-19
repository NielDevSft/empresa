#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.
ARG VERSION=8.0

FROM mcr.microsoft.com/dotnet/aspnet:$VERSION AS base
USER app
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:$VERSION AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ./*.sln .
COPY ./EmpresaAPI.API/*.csproj EmpresaAPI.API/
COPY ./EmpresaAPI.Common/*.csproj EmpresaAPI.Common/
COPY ./EmpresaAPI.Domain/*.csproj EmpresaAPI.Domain/
COPY ./EmpresaAPI.Domain.Core/*.csproj EmpresaAPI.Domain.Core/
COPY ./EmpresaAPI.Persistence/*.csproj EmpresaAPI.Persistence/
COPY . .
RUN dotnet restore 


WORKDIR /src/EmpresaAPI.API
RUN dotnet build ./EmpresaAPI.API.csproj -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish ./EmpresaAPI.API.csproj -c $BUILD_CONFIGURATION -o /app/publish --no-restore

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT dotnet EmpresaAPI.API.dll
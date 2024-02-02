
FROM mcr.microsoft.com/mssql/server:2017-latest

ENV SA_PASSWORD LojaSenha@247
ENV ACCEPT_EULA Y

ENV MSSQL_DB DBLoja
ENV MSSQL_USER AdmLoja
ENV MSSQL_PASSWORD LojaSenha@247

EXPOSE 1433

WORKDIR /usr/src/app

COPY ./sql-scripts/ /usr/src/app/
CMD /opt/mssql/bin/sqlservr


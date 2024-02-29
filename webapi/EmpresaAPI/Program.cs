using System.Security.Authentication;
using EmpresaAPI.Configurations;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Serilog;

namespace EmpresaAPI;

public class Program
{
    public static int Main(string[] args)
    {
        try
        {
            var hostBuilder = CreateHostBuilder(args).Build();
            Serilog.Log.Information("Iniciando Web Host");
            hostBuilder.Run();
            return 0;
        }
        catch (Exception ex)
        {
            Serilog.Log.Fatal(ex, "Host encerrado inesperadamente");
            return 1;
        }
        finally
        {
            Serilog.Log.CloseAndFlush();
        }
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureAppConfiguration((hostingContext, config) =>
            {
                Serilog.Log.Logger = LoggingConfiguration.GetConfiguration(config);
            })
            .UseSerilog()
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.ConfigureKestrel(serverOptions =>
                    {
                        serverOptions.Limits.MinRequestBodyDataRate = new MinDataRate(100, TimeSpan.FromSeconds(10));
                        serverOptions.Limits.MinResponseDataRate = new MinDataRate(100, TimeSpan.FromSeconds(10));
                        serverOptions.Limits.KeepAliveTimeout = TimeSpan.FromMinutes(2);
                        serverOptions.Limits.RequestHeadersTimeout = TimeSpan.FromMinutes(1);
                        serverOptions.ConfigureHttpsDefaults(listenOptions =>
                        {
                            listenOptions.SslProtocols = SslProtocols.None;
                        });
                    })
                    .UseStartup<Startup>();

            });
}
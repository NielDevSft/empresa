using EmpresaApi.API.Configurations;
using EmpresaAPI.Common.IoC;
using EmpresaAPI.Persistence.Contexts;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
Serilog.Log.Logger = LoggingConfiguration.GetConfiguration(builder.Configuration);
builder.Host.UseSerilog();
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.MinRequestBodyDataRate = new MinDataRate(100, TimeSpan.FromSeconds(10));
    serverOptions.Limits.MinResponseDataRate = new MinDataRate(100, TimeSpan.FromSeconds(10));
    serverOptions.Limits.KeepAliveTimeout = TimeSpan.FromMinutes(2);
    serverOptions.Limits.RequestHeadersTimeout = TimeSpan.FromMinutes(1);
});
NativeInjectorBootStrapper.RegisterServices(builder.Services, builder.Configuration);
SwaggerConfiguration.AddSwagger(builder.Services);
MvcConfiguration.AddMvcSecurity(builder.Services);

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("./swagger/v1/swagger.json", "Empresa API");
    c.DocumentTitle = "Empresa API";
    c.RoutePrefix = string.Empty;
});

app.UseRouting();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

using (var serviceScope = app.Services.CreateScope())
{
    try
    {
        var cultureInfo = new CultureInfo("pt"); // Substitua "en-US" pela cultura desejada
        CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
        CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;
        var context = serviceScope.ServiceProvider.GetRequiredService<EmpresaOrganizationContext>();
        context.Database.Migrate();
    }
    catch (SqlException ex)
    {
        if (ex.ErrorCode == -2146232060)
        {
            Console.WriteLine(ex.Message);
        }
    }
}

app.MapControllers();


app.Run();

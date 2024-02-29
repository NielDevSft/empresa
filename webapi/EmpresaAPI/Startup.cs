using Authentication.Common.Ioc;
using EmpresaAPI.Infrastructure.Persistence.Contexts;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace EmpresaAPI;

public class Startup(IConfiguration configuration, IWebHostEnvironment env)
{
    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        NativeInjectorBootStrapper.RegisterServices(services, configuration, env);
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseHttpsRedirection();

        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("./swagger/v1/swagger.json", "JWT Auth Demo V1");
            c.DocumentTitle = "JWT Auth Demo";
            c.RoutePrefix = string.Empty;
        });

        app.UseRouting();
        app.UseCors("AllowAll");
        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });

        var cultureInfo = new CultureInfo("pt-BR"); // Substitua "en-US" pela cultura desejada
        CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
        CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;
        using (var serviceScope = app.ApplicationServices.CreateScope())
        {
            try { 
                var context = serviceScope.ServiceProvider.GetRequiredService<LojaOrganizationContext>();
                context.Database.Migrate();
            } catch (SqlException ex) { 
                if(ex.ErrorCode == -2146232060)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }
    }
}
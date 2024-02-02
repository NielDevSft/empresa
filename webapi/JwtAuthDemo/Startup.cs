using Authentication.Common.Ioc;
using JwtAuthDemo.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace JwtAuthDemo;

public class Startup(IConfiguration configuration)
{
    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        NativeInjectorBootStrapper.RegisterServices(services, configuration);
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
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

        using (var serviceScope = app.ApplicationServices.CreateScope())
        {
            var context = serviceScope.ServiceProvider.GetRequiredService<LojaOrganizationContext>();
            context.Database.Migrate();
        }
    }
}
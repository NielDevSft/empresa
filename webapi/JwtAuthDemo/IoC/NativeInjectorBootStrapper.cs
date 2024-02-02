
using Microsoft.EntityFrameworkCore;
using JwtAuthDemo.Configurations;
using JwtAuthDemo.Infrastructure.Persistence.Contexts;
using JwtAuthDemo.IoC;
using Microsoft.Extensions.Options;


namespace Authentication.Common.Ioc
{
    public class NativeInjectorBootStrapper
    {
        public static void RegisterServices(IServiceCollection services, IConfiguration configuration)
        {
            JWTConfiguration.AddJWT(services, configuration);
            SwaggerConfiguration.AddSwagger(services);

            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder => { builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader(); });
            });

            //Repositories
            //InjectorRepositories.AddRepositories(services);

            //Services Bussines
            InjectorServices.AddServices(services);

            services.AddDbContext<LojaOrganizationContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
                options.UseLoggerFactory(LoggerFactory.Create(builder => builder.AddConsole()));
                options.EnableSensitiveDataLogging(); // Isso permite que dados sensíveis também sejam logados
            });
    }
    }
}


using Microsoft.EntityFrameworkCore;
using EmpresaAPI.Configurations;
using EmpresaAPI.Infrastructure.Persistence.Contexts;
using EmpresaAPI.IoC;
using Microsoft.Extensions.Options;
using EmpresaAPI;
using AutoMapper;


namespace Authentication.Common.Ioc
{
    public class NativeInjectorBootStrapper
    {
        public static void RegisterServices(IServiceCollection services, IConfiguration configuration)
        {
            JWTConfiguration.AddJWT(services, configuration);
            SwaggerConfiguration.AddSwagger(services);

            services.AddAutoMapper(typeof(Program).Assembly);
            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder => { builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader(); });
            });

            // Repositories
            InjectorRepositories.AddRepositories(services);

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

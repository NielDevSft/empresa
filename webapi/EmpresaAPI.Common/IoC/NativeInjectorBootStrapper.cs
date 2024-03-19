
using EmpresaAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace EmpresaAPI.Common.IoC
{
    public class NativeInjectorBootStrapper()
    {
        public static void RegisterServices(IServiceCollection services, IConfiguration configuration)
        {
            // Repositories
            InjectorRepositories.AddRepositories(services);

            //Services Bussines
            InjectorServices.AddServices(services);
           
            services.AddDbContext<EmpresaOrganizationContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
                options.EnableSensitiveDataLogging(); // Isso permite que dados sensíveis também sejam logados
            });
        }
    }
}

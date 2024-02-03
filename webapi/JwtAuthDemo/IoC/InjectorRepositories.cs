using JwtAuthDemo.Contracts.Repositories;
using JwtAuthDemo.Contracts.Services;
using JwtAuthDemo.Infrastructure.Persistence.Repository;
using JwtAuthDemo.Services;

namespace JwtAuthDemo.IoC
{
    public class InjectorRepositories
    {
        public static void AddRepositories(IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserRoleRepository, UserRoleRepository>();
        }
    }
}

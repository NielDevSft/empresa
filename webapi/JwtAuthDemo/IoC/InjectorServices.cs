using JwtAuthDemo.Contracts.Services;
using JwtAuthDemo.Services;

namespace JwtAuthDemo.IoC
{
    public class InjectorServices
    {
        public static void AddServices(IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
        }
    }
}

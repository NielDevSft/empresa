using EmpresaAPI.Contracts.Services;
using EmpresaAPI.Services;

namespace EmpresaAPI.IoC
{
    public class InjectorServices
    {
        public static void AddServices(IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IItemService, ItemService>();
            services.AddScoped<IItemEstoqueService, ItemEstoqueService>();

        }
    }
}

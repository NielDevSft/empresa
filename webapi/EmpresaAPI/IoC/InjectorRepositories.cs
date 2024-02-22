using EmpresaAPI.Contracts.Repositories;
using EmpresaAPI.Infrastructure.Persistence.Repository;
using Microsoft.Extensions.DependencyInjection;

namespace EmpresaAPI.IoC
{
    public class InjectorRepositories
    {
        public static void AddRepositories(IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserRoleRepository, UserRoleRepository>();
            services.AddScoped<IItemRepository, ItemRepository>();
            services.AddScoped<IItemEstoqueRepository, ItemEstoqueRepository>();
            services.AddScoped<IPedidoRepository, PedidoRepository>();
            services.AddScoped<IItemPedidoRepository, ItemPedidoRepository>();
        }
    }
}

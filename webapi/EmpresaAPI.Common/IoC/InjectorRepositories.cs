using EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque.Repository;
using EmpresaAPI.Domain.Pedidos.Itens.Repository;
using EmpresaAPI.Domain.Pedidos.ItensPedidos.Repository;
using EmpresaAPI.Domain.Pedidos.Repository;
using EmpresaAPI.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace EmpresaAPI.Common.IoC
{
    public class InjectorRepositories
    {
        public static void AddRepositories(IServiceCollection services)
        {
            services.AddScoped<IItemRepository, ItemRepository>();
            services.AddScoped<IItemEstoqueRepository, ItemEstoqueRepository>();
            services.AddScoped<IPedidoRepository, PedidoRepository>();
            services.AddScoped<IItemPedidoRepository, ItemPedidoRepository>();
        }
    }
}

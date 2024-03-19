using EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque.Service;
using EmpresaAPI.Domain.Pedidos.Itens.Service;
using EmpresaAPI.Domain.Pedidos.Service;
using EmpresaAPI.Persistence.Services;
using Microsoft.Extensions.DependencyInjection;

namespace EmpresaAPI.Common.IoC
{
    public class InjectorServices
    {
        public static void AddServices(IServiceCollection services)
        {
            services.AddScoped<IItemService, ItemService>();
            services.AddScoped<IItemEstoqueService, ItemEstoqueService>();
            services.AddScoped<IPedidoService, PedidoService>();

        }
    }
}

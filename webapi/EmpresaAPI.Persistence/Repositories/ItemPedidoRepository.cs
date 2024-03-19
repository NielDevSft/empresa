using EmpresaAPI.Domain.Pedidos.ItensPedidos;
using EmpresaAPI.Domain.Pedidos.ItensPedidos.Repository;
using EmpresaAPI.Persistence.Contexts;
using Microsoft.Extensions.Logging;

namespace EmpresaAPI.Persistence.Repositories
{
    public class ItemPedidoRepository : Repository<ItemPedido>, IItemPedidoRepository
    {
        public ItemPedidoRepository(EmpresaOrganizationContext context, ILogger<ItemPedidoRepository> logger) : base(context, logger)
        {
        }
    }
}

using EmpresaAPI.Domain.Pedidos.ItensPedidos;
using EmpresaAPI.Domain.Pedidos.ItensPedidos.Repository;
using EmpresaAPI.Persistence.Contexts;

namespace EmpresaAPI.Persistence.Repositories
{
    public class ItemPedidoRepository : Repository<ItemPedido>, IItemPedidoRepository
    {
        public ItemPedidoRepository(EmpresaOrganizationContext context) : base(context)
        {
        }
    }
}

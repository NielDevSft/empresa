using EmpresaAPI.Contracts.Repositories;
using EmpresaAPI.Infrastructure.Persistence.Contexts;
using EmpresaAPI.Models;

namespace EmpresaAPI.Infrastructure.Persistence.Repository
{
    public class ItemPedidoRepository : Repository<ItemPedido>, IItemPedidoRepository
    {
        public ItemPedidoRepository(LojaOrganizationContext context) : base(context)
        {
        }
    }
}

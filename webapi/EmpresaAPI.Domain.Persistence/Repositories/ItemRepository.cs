using EmpresaAPI.Domain.Pedidos.Itens;
using EmpresaAPI.Domain.Pedidos.Itens.Repository;
using EmpresaAPI.Persistence.Contexts;

namespace EmpresaAPI.Persistence.Repositories
{
    public class ItemRepository : Repository<Item>, IItemRepository
    {
        public ItemRepository(EmpresaOrganizationContext context) : base(context)
        {
        }
    }
}

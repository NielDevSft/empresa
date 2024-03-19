using EmpresaAPI.Domain.Pedidos.Itens;
using EmpresaAPI.Domain.Pedidos.Itens.Repository;
using EmpresaAPI.Persistence.Contexts;
using Microsoft.Extensions.Logging;

namespace EmpresaAPI.Persistence.Repositories
{
    public class ItemRepository : Repository<Item>, IItemRepository
    {
        public ItemRepository(EmpresaOrganizationContext context, ILogger<ItemRepository> logger) : base(context, logger)
        {
        }
    }
}

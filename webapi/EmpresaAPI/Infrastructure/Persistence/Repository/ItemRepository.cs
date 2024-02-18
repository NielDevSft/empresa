using EmpresaAPI.Contracts.Repositories;
using EmpresaAPI.Infrastructure.Persistence.Contexts;
using EmpresaAPI.Models;

namespace EmpresaAPI.Infrastructure.Persistence.Repository
{
    public class ItemRepository : Repository<Item>, IItemRepository
    {
        public ItemRepository(LojaOrganizationContext context) : base(context)
        {
        }
    }
}

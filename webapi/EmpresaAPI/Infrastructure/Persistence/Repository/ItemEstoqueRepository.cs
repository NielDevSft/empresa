using EmpresaAPI.Contracts.Repositories;
using EmpresaAPI.Infrastructure.Persistence.Contexts;
using EmpresaAPI.Models;

namespace EmpresaAPI.Infrastructure.Persistence.Repository
{
    public class ItemEstoqueRepository : Repository<ItemEstoque>, IItemEstoqueRepository
    {
        public ItemEstoqueRepository(LojaOrganizationContext context) : base(context)
        {
        }
    }
}

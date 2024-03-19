using EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque;
using EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque.Repository;
using EmpresaAPI.Persistence.Contexts;

namespace EmpresaAPI.Persistence.Repositories
{
    public class ItemEstoqueRepository : Repository<ItemEstoque>, IItemEstoqueRepository
    {
        public ItemEstoqueRepository(EmpresaOrganizationContext context) : base(context)
        {
        }
    }
}

using EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque;
using EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque.Repository;
using EmpresaAPI.Persistence.Contexts;
using Microsoft.Extensions.Logging;

namespace EmpresaAPI.Persistence.Repositories
{
    public class ItemEstoqueRepository : Repository<ItemEstoque>, IItemEstoqueRepository
    {
        public ItemEstoqueRepository(EmpresaOrganizationContext context, ILogger<ItemEstoqueRepository> logger) : base(context, logger)
        {
        }
    }
}

using EmpresaAPI.Contracts.Repositories;
using EmpresaAPI.Infrastructure.Persistence.Contexts;
using EmpresaAPI.Models;

namespace EmpresaAPI.Infrastructure.Persistence.Repository
{
    public class PedidoRepository : Repository<Pedido>, IPedidoRepository
    {
        public PedidoRepository(LojaOrganizationContext context) : base(context)
        {
        }
    }
}

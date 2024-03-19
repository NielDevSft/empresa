using EmpresaAPI.Domain.Pedidos;
using EmpresaAPI.Domain.Pedidos.Repository;
using EmpresaAPI.Persistence.Contexts;

namespace EmpresaAPI.Persistence.Repositories
{
    public class PedidoRepository : Repository<Pedido>, IPedidoRepository
    {
        public PedidoRepository(EmpresaOrganizationContext context) : base(context)
        {
        }
    }
}

using EmpresaAPI.Domain.Pedidos;
using EmpresaAPI.Domain.Pedidos.Repository;
using EmpresaAPI.Persistence.Contexts;
using Microsoft.Extensions.Logging;

namespace EmpresaAPI.Persistence.Repositories
{
    public class PedidoRepository : Repository<Pedido>, IPedidoRepository
    {
        public PedidoRepository(EmpresaOrganizationContext context, ILogger<PedidoRepository> logger) : base(context, logger)
        {
        }
    }
}

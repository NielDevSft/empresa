
using EmpresaAPI.Domain.Core.Models;
using EmpresaAPI.Domain.Pedidos.Itens;

namespace EmpresaAPI.Domain.Pedidos.ItensPedidos
{
    public class ItemPedido : Entity<ItemPedido>
    {
        public Guid PedidoUuid { get; set; }
        public Guid ItemUuid { get; set; }
        public int QtdItem { get; set; }
        public Pedido? Pedido { get; set; } = null;
        public Item? Item { get; set; } = null;

        public override bool IsValid()
        {
            return true;
        }
    }
}

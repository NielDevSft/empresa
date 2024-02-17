namespace EmpresaAPI.Models
{
    public class ItemPedido : Entity<ItemPedido>
    {
        public int PedidoId { get; set; }
        public int ItemId { get; set; }
        public int QtdItem { get; set; }
        public Pedido? Pedido { get; set; } = null;
        public Item? Item { get; set; } = null;

        public override bool IsValid()
        {
            return true;
        }
    }
}

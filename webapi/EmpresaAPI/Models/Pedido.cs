using static System.Runtime.InteropServices.JavaScript.JSType;

namespace EmpresaAPI.Models
{
    public class Pedido : Entity<Pedido>
    {
        public required string ProfissionalResponsavel { get; set; }
        public decimal ValorTotal { get; set; }
        public List<ItemPedido> ItensPedido { get; set; } = [];
        public override bool IsValid()
        {
            return true;
        }
    }
}

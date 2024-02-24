using EmpresaAPI.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace EmpresaAPI.Dtos
{
    public class PedidoDto
    {
        public int? Id { get; set; } = 0;
        public string ProfissionalResponsavel { get; set; } = string.Empty;
        public List<ItemPedidoDto> ItensPedido { get; set; } = new List<ItemPedidoDto>();
        public decimal ValorTotal { get; set; } = decimal.Zero;
        public DateTime? UpdateAt { get; set; } = null;
        public DateTime? CreateAt { get; set; } = null;
    }
}
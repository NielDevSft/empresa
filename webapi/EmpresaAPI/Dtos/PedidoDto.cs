using EmpresaAPI.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace EmpresaAPI.Dtos
{
    public class PedidoDto
    {
        public int Id { get; set; } = 0;
        public User ProfissionalResponsavel { get; set; } = null;
        public List<ItemEstoque> ItensPedido { get; set; } = new List<ItemEstoque>();
        public decimal ValTotal { get; set; } = decimal.Zero;
        public Date UpdateAt { get; set; } = null;
        public Date CreateAt { get; set; } = null;
    }
}
using EmpresaAPI.Models;

namespace EmpresaAPI.Dtos
{
    public class ItemPedidoDto
    {
        public ItemDto Item { get; set; } = null;
        public int QtdItem { get; set; } = 0;
    }
}

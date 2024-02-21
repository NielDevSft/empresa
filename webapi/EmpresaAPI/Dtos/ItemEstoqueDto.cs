using EmpresaAPI.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace EmpresaAPI.Dtos
{
    public class ItemEstoqueDto
    {
        public int? Id { get; set; } = 0;
        public ItemDto Item { get; set; } = null;
        public int QtdItem { get; set; } = 0;
        public DateTime? UpdateAt { get; set; } = null;
        public DateTime? CreateAt { get; set; } = null;
    }
}

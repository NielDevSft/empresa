using EmpresaAPI.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace EmpresaAPI.Dtos
{
    public class ItemEstoqueDto
    {
        public int Id { get; set; } = 0;
        public Item Item { get; set; } = null;
        public int QtdItem { get; set; } = 0;
        public Date UpdateAt { get; set; } = null;
        public Date CreateAt { get; set; } = null;
    }
}

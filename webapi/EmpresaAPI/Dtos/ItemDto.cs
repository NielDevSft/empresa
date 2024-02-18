using static System.Runtime.InteropServices.JavaScript.JSType;

namespace EmpresaAPI.Dtos
{
    public class ItemDto
    {
        public int? Id { get; set; } = 0;
        public string NomItem { get; set; } = string.Empty;
        public decimal ValItem { get; set; } = decimal.Zero;
        public string DesItem { get; set; } = string.Empty;
        public DateTime? UpdateAt { get; set; } = null;
        public DateTime? CreateAt { get; set; } = null;
    }
}

namespace EmpresaApi.API.Dtos
{
    public class ItemDto
    {
        public Guid? Uuid { get; set; }
        public string NomItem { get; set; } = string.Empty;
        public decimal ValItem { get; set; } = decimal.Zero;
        public string DesItem { get; set; } = string.Empty;
        public DateTime? UpdateAt { get; set; } = null;
        public DateTime? CreateAt { get; set; } = null;
    }
}

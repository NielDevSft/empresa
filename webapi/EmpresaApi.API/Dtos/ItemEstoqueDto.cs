namespace EmpresaApi.API.Dtos
{
    public class ItemEstoqueDto
    {
        public int? Id { get; set; } = 0;
        public ItemDto? Item { get; set; }
        public int QtdItem { get; set; } = 0;
        public DateTime? UpdateAt { get; set; } = null;
        public DateTime? CreateAt { get; set; } = null;
    }
}

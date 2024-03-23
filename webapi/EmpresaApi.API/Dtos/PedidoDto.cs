namespace EmpresaApi.API.Dtos
{
    public class PedidoDto
    {
        public Guid? Uuid { get; set; }
        public string ProfissionalResponsavel { get; set; } = string.Empty;
        public List<ItemPedidoDto> ItensPedido { get; set; } = new List<ItemPedidoDto>();
        public decimal ValorTotal { get; set; } = decimal.Zero;
        public DateTime? UpdateAt { get; set; } = null;
        public DateTime? CreateAt { get; set; } = null;
    }
}
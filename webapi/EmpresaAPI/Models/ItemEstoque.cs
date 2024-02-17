namespace EmpresaAPI.Models
{
    public class ItemEstoque : Entity<ItemEstoque>
    {
        public required string NomItem { get; set; }
        public decimal ValItem { get; set; }
        public required string DesItem { get; set; }
        public override bool IsValid()
        {
            return true;
        }
    }
}

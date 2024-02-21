namespace EmpresaAPI.Models
{
    public class ItemEstoque : Entity<ItemEstoque>
    {
        public virtual Item Item { get; set; } = null;
        public decimal QtdItem { get; set; }
        public override bool IsValid()
        {
            return true;
        }
    }
}

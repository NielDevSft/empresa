namespace EmpresaAPI.Models
{
    public class JwtClaim : Entity<JwtClaim>
    {
        public string Subject { get; set; } = null!;

        public virtual ICollection<Role> Roles { get; set; } = new List<Role>();
        public override bool IsValid()
        {
            return true;
        }
    }
}

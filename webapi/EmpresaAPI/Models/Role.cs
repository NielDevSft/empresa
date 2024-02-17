namespace EmpresaAPI.Models
{
    public class Role : Entity<Role>
    {
        public int? JwtClaimsId { get; set; }
        public string Name { get; set; } = null!;
        public virtual JwtClaim? JwtClaims { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
        public override bool IsValid()
        {
            return true;
        }
    }
}

namespace JwtAuthDemo.Models
{
    public class JwtClaims : Entity<JwtClaims>
    {
        public required string Subject { get; set; } // Sub
        public required List<Role> Role { get; set; }
        public override bool IsValid()
        {
            return true;
        }
    }
}

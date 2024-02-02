namespace JwtAuthDemo.Models
{
    public class User : Entity<User>
    {
        public required string Username { get; set; }
        public required string PasswordHash { get; set; }
        public required string Email { get; set; }
        public override bool IsValid()
        {
            return true;
        }
    }
}

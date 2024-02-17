namespace EmpresaAPI.Models
{
    public class User : Entity<User>
    {
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public string Username { get; set; } = null!;

        public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
        public override bool IsValid()
        {
            return true;
        }
    }
}

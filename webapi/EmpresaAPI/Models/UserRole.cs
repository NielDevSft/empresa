namespace EmpresaAPI.Models
{
    public class UserRole: Entity<UserRole>
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }

        public User? User { get; set; }
        public Role? Role { get; set; }

        public override bool IsValid()
        {
            return true;
        }
    }
}

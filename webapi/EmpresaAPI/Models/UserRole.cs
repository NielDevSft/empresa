namespace EmpresaAPI.Models
{

    public class UserRole : Entity<UserRole>
    {
        public int? UserId { get; set; }
        public int? RoleId { get; set; }
        public virtual Role? Role { get; set; }

        public virtual User? User { get; set; }

        public override bool IsValid()
        {
            return true;
        }
    }
}

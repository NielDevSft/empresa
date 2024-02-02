namespace JwtAuthDemo.Models
{
    public class Role : Entity<Role>
    {
        public string Name { get; set; }

        public override bool IsValid()
        {
            return true;
        }
    }
}

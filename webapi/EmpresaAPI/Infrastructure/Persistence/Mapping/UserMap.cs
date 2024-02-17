using EmpresaAPI.Infrastructure.Persistence.Extentions;
using EmpresaAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmpresaAPI.Infrastructure.Persistence.Mapping
{
    public class UserMap : EntityTypeConfiguration<User>
    {
        public override void Map(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(e => e.Id).HasName("PK__User__3214EC07FD07BE5C");

            builder.ToTable("User");
        }
    }
}

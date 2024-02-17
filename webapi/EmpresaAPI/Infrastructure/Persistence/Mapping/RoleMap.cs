using EmpresaAPI.Infrastructure.Persistence.Extentions;
using EmpresaAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmpresaAPI.Infrastructure.Persistence.Mapping
{
    public class RoleMap : EntityTypeConfiguration<Role>
    {
        public override void Map(EntityTypeBuilder<Role> builder)
        {
            builder.HasKey(e => e.Id).HasName("PK__Role__3214EC07A49337EE");

            builder.ToTable("Role");

            builder.HasOne(d => d.JwtClaims).WithMany(p => p.Roles)
                .HasForeignKey(d => d.JwtClaimsId)
                .HasConstraintName("FK__Role__JwtClaimsI__38996AB5");
        }
    }
}

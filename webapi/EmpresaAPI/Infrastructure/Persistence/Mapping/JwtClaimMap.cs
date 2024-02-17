using EmpresaAPI.Infrastructure.Persistence.Extentions;
using EmpresaAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmpresaAPI.Infrastructure.Persistence.Mapping
{
    public class JwtClaimMap : EntityTypeConfiguration<JwtClaim>
    {
        public override void Map(EntityTypeBuilder<JwtClaim> builder)
        {
            builder.HasKey(e => e.Id).HasName("PK__JwtClaim__3214EC071199C69E");
        }
    }
}

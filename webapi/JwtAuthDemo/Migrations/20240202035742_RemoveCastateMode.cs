using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JwtAuthDemo.Migrations
{
    /// <inheritdoc />
    public partial class RemoveCastateMode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RuleLevelCascadeMode",
                table: "User");

            migrationBuilder.DropColumn(
                name: "RuleLevelCascadeMode",
                table: "Role");

            migrationBuilder.DropColumn(
                name: "RuleLevelCascadeMode",
                table: "JwtClaims");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RuleLevelCascadeMode",
                table: "User",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RuleLevelCascadeMode",
                table: "Role",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RuleLevelCascadeMode",
                table: "JwtClaims",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}

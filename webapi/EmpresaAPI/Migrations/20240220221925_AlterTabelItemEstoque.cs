using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmpresaAPI.Migrations
{
    /// <inheritdoc />
    public partial class AlterTabelItemEstoque : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DesItem",
                schema: "app",
                table: "ItemEstoque");

            migrationBuilder.DropColumn(
                name: "NomItem",
                schema: "app",
                table: "ItemEstoque");

            migrationBuilder.RenameColumn(
                name: "ValItem",
                schema: "app",
                table: "ItemEstoque",
                newName: "QtdItem");

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                schema: "app",
                table: "ItemEstoque",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ItemEstoque_ItemId",
                schema: "app",
                table: "ItemEstoque",
                column: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemEstoque_Item_ItemId",
                schema: "app",
                table: "ItemEstoque",
                column: "ItemId",
                principalSchema: "app",
                principalTable: "Item",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemEstoque_Item_ItemId",
                schema: "app",
                table: "ItemEstoque");

            migrationBuilder.DropIndex(
                name: "IX_ItemEstoque_ItemId",
                schema: "app",
                table: "ItemEstoque");

            migrationBuilder.DropColumn(
                name: "ItemId",
                schema: "app",
                table: "ItemEstoque");

            migrationBuilder.RenameColumn(
                name: "QtdItem",
                schema: "app",
                table: "ItemEstoque",
                newName: "ValItem");

            migrationBuilder.AddColumn<string>(
                name: "DesItem",
                schema: "app",
                table: "ItemEstoque",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NomItem",
                schema: "app",
                table: "ItemEstoque",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}

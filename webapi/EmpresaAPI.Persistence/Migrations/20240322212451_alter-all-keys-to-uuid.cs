using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmpresaAPI.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class alterallkeystouuid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemEstoque_Item_ItemId",
                schema: "app",
                table: "ItemEstoque");

            migrationBuilder.DropForeignKey(
                name: "FK_ItemPedido_Item_ItemId",
                schema: "app",
                table: "ItemPedido");

            migrationBuilder.DropForeignKey(
                name: "FK_ItemPedido_Pedido_PedidoId",
                schema: "app",
                table: "ItemPedido");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Pedido",
                schema: "app",
                table: "Pedido");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ItemPedido",
                schema: "app",
                table: "ItemPedido");

            migrationBuilder.DropIndex(
                name: "IX_ItemPedido_ItemId",
                schema: "app",
                table: "ItemPedido");

            migrationBuilder.DropIndex(
                name: "IX_ItemPedido_PedidoId",
                schema: "app",
                table: "ItemPedido");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ItemEstoque",
                schema: "app",
                table: "ItemEstoque");

            migrationBuilder.DropIndex(
                name: "IX_ItemEstoque_ItemId",
                schema: "app",
                table: "ItemEstoque");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Item",
                schema: "app",
                table: "Item");

            migrationBuilder.DropColumn(
                name: "Id",
                schema: "app",
                table: "Pedido");

            migrationBuilder.DropColumn(
                name: "Id",
                schema: "app",
                table: "ItemPedido");

            migrationBuilder.DropColumn(
                name: "ItemId",
                schema: "app",
                table: "ItemPedido");

            migrationBuilder.DropColumn(
                name: "PedidoId",
                schema: "app",
                table: "ItemPedido");

            migrationBuilder.DropColumn(
                name: "Id",
                schema: "app",
                table: "ItemEstoque");

            migrationBuilder.DropColumn(
                name: "ItemId",
                schema: "app",
                table: "ItemEstoque");

            migrationBuilder.DropColumn(
                name: "Id",
                schema: "app",
                table: "Item");

            migrationBuilder.AddColumn<Guid>(
                name: "Uuid",
                schema: "app",
                table: "Pedido",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "newsequentialid()");

            migrationBuilder.AddColumn<Guid>(
                name: "Uuid",
                schema: "app",
                table: "ItemPedido",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "newsequentialid()");

            migrationBuilder.AddColumn<Guid>(
                name: "ItemUuid",
                schema: "app",
                table: "ItemPedido",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "PedidoUuid",
                schema: "app",
                table: "ItemPedido",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "Uuid",
                schema: "app",
                table: "ItemEstoque",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "newsequentialid()");

            migrationBuilder.AddColumn<Guid>(
                name: "ItemUuid",
                schema: "app",
                table: "ItemEstoque",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "Uuid",
                schema: "app",
                table: "Item",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "newsequentialid()");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Pedido",
                schema: "app",
                table: "Pedido",
                column: "Uuid");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ItemPedido",
                schema: "app",
                table: "ItemPedido",
                column: "Uuid");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ItemEstoque",
                schema: "app",
                table: "ItemEstoque",
                column: "Uuid");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Item",
                schema: "app",
                table: "Item",
                column: "Uuid");

            migrationBuilder.CreateIndex(
                name: "IX_ItemPedido_ItemUuid",
                schema: "app",
                table: "ItemPedido",
                column: "ItemUuid");

            migrationBuilder.CreateIndex(
                name: "IX_ItemPedido_PedidoUuid",
                schema: "app",
                table: "ItemPedido",
                column: "PedidoUuid");

            migrationBuilder.CreateIndex(
                name: "IX_ItemEstoque_ItemUuid",
                schema: "app",
                table: "ItemEstoque",
                column: "ItemUuid");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemEstoque_Item_ItemUuid",
                schema: "app",
                table: "ItemEstoque",
                column: "ItemUuid",
                principalSchema: "app",
                principalTable: "Item",
                principalColumn: "Uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemPedido_Item_ItemUuid",
                schema: "app",
                table: "ItemPedido",
                column: "ItemUuid",
                principalSchema: "app",
                principalTable: "Item",
                principalColumn: "Uuid",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ItemPedido_Pedido_PedidoUuid",
                schema: "app",
                table: "ItemPedido",
                column: "PedidoUuid",
                principalSchema: "app",
                principalTable: "Pedido",
                principalColumn: "Uuid",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemEstoque_Item_ItemUuid",
                schema: "app",
                table: "ItemEstoque");

            migrationBuilder.DropForeignKey(
                name: "FK_ItemPedido_Item_ItemUuid",
                schema: "app",
                table: "ItemPedido");

            migrationBuilder.DropForeignKey(
                name: "FK_ItemPedido_Pedido_PedidoUuid",
                schema: "app",
                table: "ItemPedido");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Pedido",
                schema: "app",
                table: "Pedido");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ItemPedido",
                schema: "app",
                table: "ItemPedido");

            migrationBuilder.DropIndex(
                name: "IX_ItemPedido_ItemUuid",
                schema: "app",
                table: "ItemPedido");

            migrationBuilder.DropIndex(
                name: "IX_ItemPedido_PedidoUuid",
                schema: "app",
                table: "ItemPedido");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ItemEstoque",
                schema: "app",
                table: "ItemEstoque");

            migrationBuilder.DropIndex(
                name: "IX_ItemEstoque_ItemUuid",
                schema: "app",
                table: "ItemEstoque");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Item",
                schema: "app",
                table: "Item");

            migrationBuilder.DropColumn(
                name: "Uuid",
                schema: "app",
                table: "Pedido");

            migrationBuilder.DropColumn(
                name: "Uuid",
                schema: "app",
                table: "ItemPedido");

            migrationBuilder.DropColumn(
                name: "ItemUuid",
                schema: "app",
                table: "ItemPedido");

            migrationBuilder.DropColumn(
                name: "PedidoUuid",
                schema: "app",
                table: "ItemPedido");

            migrationBuilder.DropColumn(
                name: "Uuid",
                schema: "app",
                table: "ItemEstoque");

            migrationBuilder.DropColumn(
                name: "ItemUuid",
                schema: "app",
                table: "ItemEstoque");

            migrationBuilder.DropColumn(
                name: "Uuid",
                schema: "app",
                table: "Item");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                schema: "app",
                table: "Pedido",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                schema: "app",
                table: "ItemPedido",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                schema: "app",
                table: "ItemPedido",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PedidoId",
                schema: "app",
                table: "ItemPedido",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                schema: "app",
                table: "ItemEstoque",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                schema: "app",
                table: "ItemEstoque",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                schema: "app",
                table: "Item",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Pedido",
                schema: "app",
                table: "Pedido",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ItemPedido",
                schema: "app",
                table: "ItemPedido",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ItemEstoque",
                schema: "app",
                table: "ItemEstoque",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Item",
                schema: "app",
                table: "Item",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ItemPedido_ItemId",
                schema: "app",
                table: "ItemPedido",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemPedido_PedidoId",
                schema: "app",
                table: "ItemPedido",
                column: "PedidoId");

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
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemPedido_Item_ItemId",
                schema: "app",
                table: "ItemPedido",
                column: "ItemId",
                principalSchema: "app",
                principalTable: "Item",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ItemPedido_Pedido_PedidoId",
                schema: "app",
                table: "ItemPedido",
                column: "PedidoId",
                principalSchema: "app",
                principalTable: "Pedido",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

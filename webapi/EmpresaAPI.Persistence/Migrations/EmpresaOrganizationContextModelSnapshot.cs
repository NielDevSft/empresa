﻿// <auto-generated />
using System;
using EmpresaAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EmpresaAPI.Persistence.Migrations
{
    [DbContext(typeof(EmpresaOrganizationContext))]
    partial class EmpresaOrganizationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("app")
                .HasAnnotation("ProductVersion", "8.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("EmpresaAPI.Domain.Pedidos.Itens.Item", b =>
                {
                    b.Property<Guid>("Uuid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("newsequentialid()");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("DesItem")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NomItem")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Removed")
                        .HasColumnType("bit");

                    b.Property<DateTime>("UpdateAt")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("ValItem")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Uuid");

                    b.ToTable("Item", "app");
                });

            modelBuilder.Entity("EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque.ItemEstoque", b =>
                {
                    b.Property<Guid>("Uuid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("newsequentialid()");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("ItemUuid")
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("QtdItem")
                        .HasColumnType("decimal(18,2)");

                    b.Property<bool>("Removed")
                        .HasColumnType("bit");

                    b.Property<DateTime>("UpdateAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Uuid");

                    b.HasIndex("ItemUuid");

                    b.ToTable("ItemEstoque", "app");
                });

            modelBuilder.Entity("EmpresaAPI.Domain.Pedidos.ItensPedidos.ItemPedido", b =>
                {
                    b.Property<Guid>("Uuid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("newsequentialid()");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("ItemUuid")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PedidoUuid")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("QtdItem")
                        .HasColumnType("int");

                    b.Property<bool>("Removed")
                        .HasColumnType("bit");

                    b.Property<DateTime>("UpdateAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Uuid");

                    b.HasIndex("ItemUuid");

                    b.HasIndex("PedidoUuid");

                    b.ToTable("ItemPedido", "app");
                });

            modelBuilder.Entity("EmpresaAPI.Domain.Pedidos.Pedido", b =>
                {
                    b.Property<Guid>("Uuid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("newsequentialid()");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("ProfissionalResponsavel")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Removed")
                        .HasColumnType("bit");

                    b.Property<DateTime>("UpdateAt")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("ValorTotal")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Uuid");

                    b.ToTable("Pedido", "app");
                });

            modelBuilder.Entity("EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque.ItemEstoque", b =>
                {
                    b.HasOne("EmpresaAPI.Domain.Pedidos.Itens.Item", "Item")
                        .WithMany("ItemEstoque")
                        .HasForeignKey("ItemUuid");

                    b.Navigation("Item");
                });

            modelBuilder.Entity("EmpresaAPI.Domain.Pedidos.ItensPedidos.ItemPedido", b =>
                {
                    b.HasOne("EmpresaAPI.Domain.Pedidos.Itens.Item", "Item")
                        .WithMany("ItensPedido")
                        .HasForeignKey("ItemUuid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EmpresaAPI.Domain.Pedidos.Pedido", "Pedido")
                        .WithMany("ItensPedido")
                        .HasForeignKey("PedidoUuid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Item");

                    b.Navigation("Pedido");
                });

            modelBuilder.Entity("EmpresaAPI.Domain.Pedidos.Itens.Item", b =>
                {
                    b.Navigation("ItemEstoque");

                    b.Navigation("ItensPedido");
                });

            modelBuilder.Entity("EmpresaAPI.Domain.Pedidos.Pedido", b =>
                {
                    b.Navigation("ItensPedido");
                });
#pragma warning restore 612, 618
        }
    }
}

using AutoMapper;
using EmpresaApi.API.Dtos;
using EmpresaAPI.Domain.Pedidos;
using EmpresaAPI.Domain.Pedidos.Itens;
using EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque;
using EmpresaAPI.Domain.Pedidos.ItensPedidos;

namespace EmpresaApi.API.AutoMapper
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<Item, ItemDto>();
            CreateMap<ItemDto, Item>();
            CreateMap<ItemEstoqueDto, ItemEstoque>();
            CreateMap<ItemEstoque, ItemEstoqueDto>();
            CreateMap<ItemPedido, ItemPedidoDto>();
            CreateMap<ItemPedidoDto, ItemPedido>();
            CreateMap<Pedido, PedidoDto>();
            CreateMap<PedidoDto, Pedido>();
        }
    }
}

using AutoMapper;
using EmpresaAPI.Dtos;
using EmpresaAPI.Models;

namespace EmpresaAPI.AutoMapper
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<Item, ItemDto>();
            CreateMap<ItemDto, Item>();
            CreateMap<ItemEstoqueDto, ItemEstoque>();
            CreateMap<ItemEstoque, ItemEstoqueDto>();
            // CreateMap<Pedido, PedidoDto>();
            //CreateMap<PedidoDto, Pedido>();
        }
    }
}

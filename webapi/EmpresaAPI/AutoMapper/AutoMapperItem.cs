using AutoMapper;
using EmpresaAPI.Dtos;
using EmpresaAPI.Models;

namespace EmpresaAPI.AutoMapper
{
    public class AutoMapperItem : Profile
    {
        public AutoMapperItem()
        {
            CreateMap<Item, ItemDto>();
            CreateMap<ItemDto, Item>()
                .ForMember(i => i.UpdateAt, opt => opt.MapFrom(i => i.UpdateAt.ToString()))
                .ForMember(i => i.CreateAt, opt => opt.MapFrom(i => i.CreateAt.ToString()));
        }
    }
}

using EmpresaAPI.Contracts.Repositories;
using EmpresaAPI.Contracts.Services;
using EmpresaAPI.Models;
using Microsoft.IdentityModel.Tokens;

namespace EmpresaAPI.Services
{
    public class ItemService(IItemRepository itemRepository) : IItemService
    {
        Item IService<Item>.Create(Item item)
        {
            itemRepository.Add(item);
            itemRepository.SaveChanges();
            return item;
        }

        void IService<Item>.Delete(int id)
        {
            itemRepository.Remove(id);
            itemRepository.SaveChanges();
        }

        List<Item> IService<Item>.GetAll()
        {
            var itemList = itemRepository.FindAllWhere(i => !i.Removed);
            return itemList.ToList<Item>();
        }

        Item IService<Item>.GetById(int id)
        {
            var itemFound = itemRepository.FirstOrDefault(i => i.Id == id && !i.Removed);
            if (itemFound.IsNullOrEmpty())
            {
                throw new Exception("Item não encontrado");
            }
            return itemFound;
        }

        Item IService<Item>.Update(int id, Item item)
        {
            var itemFound = itemRepository.FirstOrDefault(i =>  item.Id == id);
            itemFound.NomItem = item.NomItem;
            itemFound.ValItem = item.ValItem;
            itemFound.DesItem = item.DesItem;
            itemFound.UpdateAt = DateTime.Now;
            itemRepository.SaveChanges();
            return itemFound;
        }
    }
}

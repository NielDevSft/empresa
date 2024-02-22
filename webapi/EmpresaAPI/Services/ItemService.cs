using EmpresaAPI.Contracts.Repositories;
using EmpresaAPI.Contracts.Services;
using EmpresaAPI.Models;
using Microsoft.IdentityModel.Tokens;

namespace EmpresaAPI.Services
{
    public class ItemService(IItemRepository itemRepository,
        IItemEstoqueRepository itemEstoqueRepository) : IItemService
    {
        Item IService<Item>.Create(Item item)
        {
            try
            {
                itemRepository.Add(item);
                itemRepository.SaveChanges();

                item.ItemEstoque.Add(new ItemEstoque
                {
                    QtdItem = 0,
                    UpdateAt = DateTime.UtcNow,
                    CreateAt = DateTime.UtcNow,
                });
                itemRepository.Update(item);
                itemRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return item;
        }

        void IService<Item>.Delete(int id)
        {
            try
            {
                var item = itemRepository.GetById(id, "ItemEstoque");
                if (item != null && item.ItemEstoque != null)
                    item.ItemEstoque.First().Removed = true;
                item.Removed = true;
                itemRepository.Update(item);
                itemRepository.SaveChanges();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                itemRepository.Dispose();
            }


        }

        List<Item> IService<Item>.GetAll()
        {
            var itemList = itemRepository.FindAllWhere(i => !i.Removed);
            itemRepository.Dispose();
            return itemList.ToList<Item>();
        }

        Item IService<Item>.GetById(int id)
        {
            var itemFound = itemRepository.FirstOrDefault(i => i.Id == id && !i.Removed);
            if (itemFound.IsNullOrEmpty())
            {
                throw new Exception("Item não encontrado");
            }
            itemRepository.Dispose();
            return itemFound;
        }

        Item IService<Item>.Update(int id, Item item)
        {
            var itemFound = itemRepository.GetById(id);
            itemFound.NomItem = item.NomItem;
            itemFound.ValItem = item.ValItem;
            itemFound.DesItem = item.DesItem;
            itemRepository.Update(itemFound);
            itemRepository.SaveChanges();
            itemRepository.Dispose();
            return itemFound;
        }
    }
}

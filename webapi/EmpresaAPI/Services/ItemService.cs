using EmpresaAPI.Contracts.Repositories;
using EmpresaAPI.Contracts.Services;
using EmpresaAPI.Models;
using Microsoft.IdentityModel.Tokens;

namespace EmpresaAPI.Services
{
    public class ItemService(IItemRepository itemRepository,
        IItemEstoqueRepository itemEstoqueRepository) : IItemService
    {
        public Item Create(Item item)
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
            }finally { itemRepository.Dispose(); }
            return item;
        }

        public void Delete(int id)
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

        public List<Item> GetAll()
        {
            var itemList = new List<Item>();
            try
            {
                itemList.AddRange(itemRepository.FindAllWhere(i => !i.Removed));
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                itemRepository.Dispose();
            }
            return itemList;
        }

        public Item GetById(int id)
        {
            Item? itemFound = null;
            try
            {
                itemFound = itemRepository
                    .FirstOrDefault(i => i.Id == id && !i.Removed);

                if (itemFound! == null)
                {
                    throw new Exception("Item não encontrado");
                }
                itemRepository.Dispose();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                itemRepository.Dispose();
            }
            return itemFound;
        }

        public Item Update(int id, Item item)
        {
            Item? itemFound = null;
            try
            {
                itemFound = itemRepository.GetById(id);
                itemFound.NomItem = item.NomItem;
                itemFound.ValItem = item.ValItem;
                itemFound.DesItem = item.DesItem;
                itemRepository.Update(itemFound);
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

            return itemFound;
        }
    }
}

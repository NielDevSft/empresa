using EmpresaAPI.Domain.Pedidos.Itens;
using EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque;
using EmpresaAPI.Domain.Pedidos.Itens.Repository;
using EmpresaAPI.Domain.Pedidos.Itens.Service;

namespace EmpresaAPI.Persistence.Services
{
    public class ItemService(IItemRepository itemRepository) : IItemService
    {
        public async Task<Item> Create(Item item)
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
            finally { itemRepository.Dispose(); }
            return item;
        }

        public async Task Delete(int id)
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

        public async Task<List<Item>> GetAll()
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

        public async Task<Item> GetById(int id)
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

        public async Task<Item> Update(int id, Item item)
        {
            Item? itemFound = null;
            try
            {
                itemFound = itemRepository.GetById(id)!;
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

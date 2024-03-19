using EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque;
using EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque.Repository;
using EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque.Service;
using EmpresaAPI.Domain.Pedidos.Itens.Repository;

namespace EmpresaAPI.Persistence.Services
{
    public class ItemEstoqueService(IItemEstoqueRepository itemEstoqueRepository, IItemRepository itemRepository) : IItemEstoqueService
    {
        public async Task<ItemEstoque> Create(ItemEstoque itemEstoque)
        {
            try
            {
                var itemEstoqueExisting = itemEstoqueRepository
                   .FindAllWhere(ie => !ie.Removed &&
                   ie.Item.Id == itemEstoque.Item.Id)
                   .FirstOrDefault();

                if (itemEstoqueExisting != null)
                {
                    itemEstoqueExisting.QtdItem = itemEstoque.QtdItem;
                    itemEstoqueRepository.Update(itemEstoqueExisting);
                }
                else
                {
                    var item = itemRepository.GetById(itemEstoque.Item.Id);
                    if (item == null)
                        throw new ArgumentException("Item não encontrado");
                    item.ItemEstoque.Add(itemEstoque);
                    itemEstoque.UpdateAt = DateTime.UtcNow;
                    itemEstoque.CreateAt = DateTime.UtcNow;
                    itemRepository.Update(item);
                }
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
            return itemEstoque;
        }

        public async Task Delete(int id)
        {
            try
            {
                itemEstoqueRepository.Remove(id);
                itemEstoqueRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally { itemRepository.Dispose(); }


        }

        public async Task<List<ItemEstoque>> GetAll()
        {
            var itemEstoque = new List<ItemEstoque>();
            try
            {
                itemEstoque.AddRange(itemEstoqueRepository.FindAllWhere(i => !i.Removed, "Item"));

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally { itemEstoqueRepository.Dispose(); }

            return itemEstoque;

        }

        public async Task<ItemEstoque> GetById(int id)
        {
            var itemFound = itemEstoqueRepository.FirstOrDefault(i => i.Id == id && !i.Removed);
            if (itemFound == null)
            {
                throw new Exception("Item Estoque não encontrado");
            }
            itemEstoqueRepository.Dispose();
            return itemFound!;
        }

        public async Task<ItemEstoque> Update(int id, ItemEstoque item)
        {
            ItemEstoque? itemEstoqueFound = null;
            try
            {
                itemEstoqueFound = itemEstoqueRepository.GetById(id);

                if (itemEstoqueFound! != null)
                {
                    itemEstoqueFound!.Item = item.Item;
                    itemEstoqueFound!.QtdItem = item.QtdItem;
                    itemEstoqueRepository.Update(itemEstoqueFound);
                    itemEstoqueRepository.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                itemEstoqueRepository.Dispose();
            }
            return itemEstoqueFound!;
        }
    }
}

using EmpresaAPI.Contracts.Repositories;
using EmpresaAPI.Contracts.Services;
using EmpresaAPI.Infrastructure.Persistence.Repository;
using EmpresaAPI.Models;
using Microsoft.IdentityModel.Tokens;

namespace EmpresaAPI.Services
{
    public class ItemEstoqueService(IItemEstoqueRepository itemEstoqueRepository, IItemRepository itemRepository) : IItemEstoqueService
    {
        public ItemEstoque Create(ItemEstoque itemEstoque)
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

        public void Delete(int id)
        {
            try
            {
                itemEstoqueRepository.Remove(id);
                itemEstoqueRepository.SaveChanges();
            }
            catch (Exception ex) { 
                throw ex; 
            }
            finally { itemRepository.Dispose(); }


        }

        public List<ItemEstoque> GetAll()
        {
            var itemList = itemEstoqueRepository.FindAllWhere(i => !i.Removed, "Item");
            itemEstoqueRepository.Dispose();
            return itemList.ToList();

        }

        public ItemEstoque GetById(int id)
        {
            var itemFound = itemEstoqueRepository.FirstOrDefault(i => i.Id == id && !i.Removed);
            if (itemFound.IsNullOrEmpty())
            {
                throw new Exception("Item Estoque não encontrado");
            }
            itemEstoqueRepository.Dispose();
            return itemFound!;
        }

        public ItemEstoque Update(int id, ItemEstoque item)
        {
            var itemFound = itemEstoqueRepository.GetById(id);
            if (itemFound != null)
            {
                itemFound!.Item = item.Item;
                itemFound!.QtdItem = item.QtdItem;
                itemEstoqueRepository.Update(itemFound);
                itemEstoqueRepository.SaveChanges();
            }
            itemEstoqueRepository.Dispose();
            return itemFound!;
        }
    }
}

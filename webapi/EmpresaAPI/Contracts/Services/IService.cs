namespace EmpresaAPI.Contracts.Services
{
    public interface IService<T>
    {
        List<T> GetAll();
        T GetById(int id);
        T Create(T item);
        T Update(int id, T item);
        void Delete(int id);
    }
}

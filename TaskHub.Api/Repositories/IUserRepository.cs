using System.Threading.Tasks;
using TaskHub.Api.Models;

namespace TaskHub.Api.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByUsernameAsync(string username);
        Task<User?> GetByIdAsync(string id);
        Task CreateAsync(User user);
    }
}

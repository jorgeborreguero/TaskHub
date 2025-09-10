using System.Threading.Tasks;
using TaskHub.Api.Models;

namespace TaskHub.Api.Services
{
    public interface IUserService
    {
        Task<User?> GetByUsernameAsync(string username);
        Task<User?> GetByIdAsync(string id);
        Task CreateAsync(User user);
    }
}

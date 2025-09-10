using System.Threading.Tasks;
using TaskHub.Api.Models;
using TaskHub.Api.Repositories;

namespace TaskHub.Api.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User?> GetByUsernameAsync(string username)
        {
            return await _userRepository.GetByUsernameAsync(username);
        }

        public async Task<User?> GetByIdAsync(string id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public async Task CreateAsync(User user)
        {
            await _userRepository.CreateAsync(user);
        }
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using TaskHub.Api.Models;

namespace TaskHub.Api.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetAllAsync();
        Task<TaskItem?> GetByIdAsync(string id);
        Task<TaskItem> CreateAsync(TaskItem task);
        Task<bool> UpdateAsync(TaskItem task);
        Task<bool> DeleteAsync(string id);
    }
}

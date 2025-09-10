
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskHub.Api.Models;
using TaskHub.Api.Repositories;


namespace TaskHub.Api.Services
{

    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<IEnumerable<TaskItem>> GetAllAsync()
        {
            return await _taskRepository.GetAllAsync();
        }

        public async Task<TaskItem?> GetByIdAsync(string id)
        {
            // El repositorio espera int, pero el modelo usa string para Id (ObjectId)
            // Se puede adaptar el repositorio para aceptar string, pero aquí convertimos si es posible
            return await _taskRepository.GetByIdAsync(int.TryParse(id, out var intId) ? intId : 0);
        }

        public async Task<TaskItem> CreateAsync(TaskItem task)
        {
            return await _taskRepository.CreateAsync(task);
        }

        public async Task<bool> UpdateAsync(TaskItem task)
        {
            return await _taskRepository.UpdateAsync(task);
        }

        public async Task<bool> DeleteAsync(string id)
        {
            return await _taskRepository.DeleteAsync(int.TryParse(id, out var intId) ? intId : 0);
        }
    }
}

using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskHub.Api.Models;
using Microsoft.Extensions.Configuration;

namespace TaskHub.Api.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly IMongoCollection<TaskItem> _tasks;

        public TaskRepository(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("MongoDb"));
            var database = client.GetDatabase("TaskHubDb");
            _tasks = database.GetCollection<TaskItem>("tasks");
        }

        public async Task<IEnumerable<TaskItem>> GetAllAsync()
        {
            return await _tasks.Find(_ => true).ToListAsync();
        }

        public async Task<TaskItem?> GetByIdAsync(int id)
        {
            return await _tasks.Find(t => t.Id == id.ToString()).FirstOrDefaultAsync();
        }

        public async Task<TaskItem> CreateAsync(TaskItem task)
        {
            await _tasks.InsertOneAsync(task);
            return task;
        }

        public async Task<bool> UpdateAsync(TaskItem task)
        {
            var result = await _tasks.ReplaceOneAsync(t => t.Id == task.Id, task);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var result = await _tasks.DeleteOneAsync(t => t.Id == id.ToString());
            return result.IsAcknowledged && result.DeletedCount > 0;
        }
    }
}

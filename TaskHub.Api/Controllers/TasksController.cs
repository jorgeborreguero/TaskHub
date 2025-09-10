using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using TaskHub.Api.Models;
using TaskHub.Api.Services;

namespace TaskHub.Api.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Authorization.Authorize]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }


        [HttpPost("{id}/timespent")]
        public async Task<IActionResult> AddTimeSpent(string id, [FromBody] double hours)
        {
            var task = await _taskService.GetByIdAsync(id);
            if (task == null)
                return NotFound();
            task.TimeSpent += hours;
            await _taskService.UpdateAsync(task);
            return Ok(task);
        }


        [HttpGet("user/{username}/timespent")]
        public async Task<IActionResult> GetUserTimeSpent(string username)
        {
            var tasks = await _taskService.GetAllAsync();
            var total = tasks.Where(t => t.AssignedTo == username).Sum(t => t.TimeSpent);
            return Ok(new { username, total });
        }


        [HttpGet("{id}/timespent")]
        public async Task<IActionResult> GetTaskTimeSpent(string id)
        {
            var task = await _taskService.GetByIdAsync(id);
            if (task == null)
                return NotFound();
            return Ok(new { task.Id, task.Title, timeSpent = task.TimeSpent });
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tasks = await _taskService.GetAllAsync();
            return Ok(tasks);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var task = await _taskService.GetByIdAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TaskItem newTask)
        {
            var createdTask = await _taskService.CreateAsync(newTask);
            return CreatedAtAction(nameof(GetById), new { id = createdTask.Id }, createdTask);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] TaskItem updatedTask)
        {
            var task = await _taskService.GetByIdAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            updatedTask.Id = id;
            var result = await _taskService.UpdateAsync(updatedTask);
            if (!result)
                return BadRequest();
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var task = await _taskService.GetByIdAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            var result = await _taskService.DeleteAsync(id);
            if (!result)
                return BadRequest();
            return NoContent();
        }


        [HttpPost("{id}/assign")]
        public async Task<IActionResult> AssignTask(string id, [FromBody] string assignedTo)
        {
            var task = await _taskService.GetByIdAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            task.AssignedTo = assignedTo;
            var result = await _taskService.UpdateAsync(task);
            if (!result)
                return BadRequest();
            return NoContent();
        }


        [HttpPost("{id}/status")]
        public async Task<IActionResult> ChangeStatus(string id, [FromBody] string status)
        {
            var task = await _taskService.GetByIdAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            task.Status = status;
            var result = await _taskService.UpdateAsync(task);
            if (!result)
                return BadRequest();
            return NoContent();
        }

        // El modelo TaskItem ahora está en TaskHub.Api.Models
    }
}

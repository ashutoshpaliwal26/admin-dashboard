import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Clock, MoreVertical, Edit2, Trash2, CheckCircle } from 'lucide-react';
import Modal from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Todo' | 'In Progress' | 'Completed';
  assignee?: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Update user dashboard',
      description: 'Implement new analytics features',
      dueDate: '2024-03-15',
      priority: 'High',
      status: 'In Progress',
      assignee: 'John Carter',
    },
    {
      id: '2',
      title: 'Fix payment integration',
      description: 'Debug Stripe webhook issues',
      dueDate: '2024-03-20',
      priority: 'High',
      status: 'Todo',
      assignee: 'Sarah Wilson',
    },
    {
      id: '3',
      title: 'Write documentation',
      description: 'Create API documentation',
      dueDate: '2024-03-25',
      priority: 'Medium',
      status: 'Todo',
      assignee: 'Michael Brown',
    },
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  
  const { showToast } = useToast();

  // Filter and search tasks
  useEffect(() => {
    let filtered = tasks;

    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(task => task.status.toLowerCase() === filter);
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  }, [filter, searchTerm, tasks]);

  const handleAddTask = (formData: FormData) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      dueDate: formData.get('dueDate') as string,
      priority: formData.get('priority') as Task['priority'],
      status: 'Todo',
      assignee: formData.get('assignee') as string,
    };

    setTasks(prev => [...prev, newTask]);
    setIsAddTaskModalOpen(false);
    showToast('Task added successfully', 'success');
  };

  const handleEditTask = (formData: FormData) => {
    if (!selectedTask) return;

    const updatedTask: Task = {
      ...selectedTask,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      dueDate: formData.get('dueDate') as string,
      priority: formData.get('priority') as Task['priority'],
      status: formData.get('status') as Task['status'],
      assignee: formData.get('assignee') as string,
    };

    setTasks(prev => prev.map(task => 
      task.id === selectedTask.id ? updatedTask : task
    ));
    setIsEditTaskModalOpen(false);
    showToast('Task updated successfully', 'success');
  };

  const handleDeleteTask = () => {
    if (!selectedTask) return;

    setTasks(prev => prev.filter(task => task.id !== selectedTask.id));
    setIsDeleteModalOpen(false);
    showToast('Task deleted successfully', 'success');
  };

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    setActiveDropdownId(null);
    showToast(`Task marked as ${newStatus}`, 'success');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/10 text-red-500';
      case 'Medium':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'Low':
        return 'bg-green-500/10 text-green-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/10 text-green-500';
      case 'In Progress':
        return 'bg-blue-500/10 text-blue-500';
      case 'Todo':
        return 'bg-gray-500/10 text-gray-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const TaskForm = ({ task, onSubmit, mode }: { task?: Task; onSubmit: (e: React.FormEvent) => void; mode: 'add' | 'edit' }) => (
    <form onSubmit={onSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Title
          </label>
          <input
            name="title"
            type="text"
            defaultValue={task?.title}
            required
            className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={task?.description}
            required
            rows={3}
            className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Due Date
            </label>
            <input
              name="dueDate"
              type="date"
              defaultValue={task?.dueDate}
              required
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Priority
            </label>
            <select
              name="priority"
              defaultValue={task?.priority}
              required
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        {mode === 'edit' && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Status
            </label>
            <select
              name="status"
              defaultValue={task?.status}
              required
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Assignee
          </label>
          <input
            name="assignee"
            type="text"
            defaultValue={task?.assignee}
            className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => {
              if (mode === 'add') setIsAddTaskModalOpen(false);
              else setIsEditTaskModalOpen(false);
            }}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {mode === 'add' ? 'Add Task' : 'Save Changes'}
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button
          onClick={() => setIsAddTaskModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'
          }`}
        >
          All Tasks
        </button>
        <button
          onClick={() => setFilter('todo')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'todo' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'
          }`}
        >
          To Do
        </button>
        <button
          onClick={() => setFilter('in progress')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'in progress' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'completed' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'
          }`}
        >
          Completed
        </button>
      </div>

      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-[#0F1631] p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                <p className="text-gray-400">{task.description}</p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setActiveDropdownId(activeDropdownId === task.id ? null : task.id)}
                  className="p-2 hover:bg-gray-800 rounded-lg"
                >
                  <MoreVertical size={20} className="text-gray-400" />
                </button>
                {activeDropdownId === task.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#0F1631] rounded-lg shadow-lg border border-gray-800 py-1 z-10">
                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setIsEditTaskModalOpen(true);
                        setActiveDropdownId(null);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-800"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setIsDeleteModalOpen(true);
                        setActiveDropdownId(null);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-800 text-red-500"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                    <div className="border-t border-gray-800 my-1" />
                    {task.status !== 'Todo' && (
                      <button
                        onClick={() => handleStatusChange(task.id, 'Todo')}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-800"
                      >
                        <CheckCircle size={16} />
                        Mark as Todo
                      </button>
                    )}
                    {task.status !== 'In Progress' && (
                      <button
                        onClick={() => handleStatusChange(task.id, 'In Progress')}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-800"
                      >
                        <CheckCircle size={16} />
                        Mark as In Progress
                      </button>
                    )}
                    {task.status !== 'Completed' && (
                      <button
                        onClick={() => handleStatusChange(task.id, 'Completed')}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-800"
                      >
                        <CheckCircle size={16} />
                        Mark as Completed
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar size={16} />
                <span>{task.dueDate}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock size={16} />
                <span>2 days left</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
              {task.assignee && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-xs">{task.assignee.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <span className="text-sm text-gray-400">{task.assignee}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        title="Add New Task"
      >
        <TaskForm
          mode="add"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTask(new FormData(e.currentTarget as HTMLFormElement));
          }}
        />
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        isOpen={isEditTaskModalOpen}
        onClose={() => setIsEditTaskModalOpen(false)}
        title="Edit Task"
      >
        {selectedTask && (
          <TaskForm
            mode="edit"
            task={selectedTask}
            onSubmit={(e) => {
              e.preventDefault();
              handleEditTask(new FormData(e.currentTarget as HTMLFormElement));
            }}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Task"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete this task? This action cannot be undone.</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteTask}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Tasks;
import { useState } from "react";
import { createTask } from "../services/taskApi";

const TaskModal = ({ columns, onClose, onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [columnId, setColumnId] = useState(columns[0]?.id || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      const task = await createTask({
        title: title.trim(),
        description,
        priority,
        column_id: Number(columnId),
      });

      onTaskCreated(task);
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-md bg-white p-4 sm:p-6 shadow-2xl border border-gray-400">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-black">
            Create Task
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 w-7 h-7 text-center items-center flex justify-center  rounded-full text-black hover:text-white hover:bg-[#3b3b3b] hover:scale-110 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="rounded-md bg-red-500/10 p-2.5 mb-3 text-xs font-medium text-red-400 border border-red-500/20">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title Input */}
          <div>
            <label className="mb-1 block text-sm font-medium text-black">
              Title
            </label>
            <input
              type="text"
              placeholder="e.g. Redesign Dashboard UI"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-700  px-3.5 py-2.5 text-sm text-black placeholder-gray-500 shadow-sm transition-all focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300/20"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-3000">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Add details about this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-700  px-3.5 py-2.5 text-sm text-black placeholder-gray-500 shadow-sm transition-all focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300/20 resize-none"
            />
          </div>

          {/* Priority & Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-black">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-white px-3 py-2.5 text-sm text-black shadow-sm transition-all focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300/20"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-black">
                Column
              </label>
              <select
                value={columnId}
                onChange={(e) => setColumnId(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-white px-3 py-2.5 text-sm text-black shadow-sm transition-all focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300/20"
              >
                {columns.map((column) => (
                  <option key={column.id} value={column.id}>
                    {column.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-black hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-black/70 "
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
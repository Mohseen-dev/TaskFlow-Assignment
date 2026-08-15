import React, { useState, useEffect } from "react";
import { deleteTask, getBoard, getTasks, moveTask } from "../services/taskApi";
import TaskModal from "./TaskModal";
import EditTaskModal from "./EditTaskModal";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const Board = () => {
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editSelectTaskModal, setEditSelectTaskModal] = useState(null);
  const [applyingFilter, setApplyingFilter] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState("");

  const loadBoard = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getBoard(1);
      setBoard(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (task) => {
    try {
      await deleteTask(task.id);
      loadBoard();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleMoveTask = async (taskId, columnId) => {
    try {
      await moveTask(taskId, columnId);
      await loadBoard();
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePriorityFilter = async (priority) => {
    setSelectedPriority(priority);
    setApplyingFilter(true);
    try {
      if (!priority) {
        // "All Priorities" selected — clear filter, show everything
        setFilteredTasks(null);
      } else {
        const tasks = await getTasks(priority);
        setFilteredTasks(tasks);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setApplyingFilter(false);
    }
  };

  // Returns the tasks to render for a given column, respecting the active filter
  const getColumnTasks = (column) => {
    if (!filteredTasks) return column.tasks;
    const filteredIds = new Set(filteredTasks.map((t) => t.id));
    return column.tasks.filter((task) => filteredIds.has(task.id));
  };

  useEffect(() => {
    loadBoard();
  }, []);

  if (loading) {
    return <p className="p-8 text-center">Loading Board...</p>;
  }
  if (error) {
    return <p className="p-8 text-center text-red-500">{error}</p>;
  }

  return (
    <main className="bg-white p-4 sm:p-6 lg:p-8 min-h-screen w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 px-2 sm:px-8">
        <h1 className="text-xl sm:text-2xl font-semibold">{board.name}</h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            className="w-full sm:w-80 rounded-lg border border-gray-700 bg-white px-3 py-2.5 text-sm text-black shadow-sm transition-all focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300/20"
            value={selectedPriority}
            onChange={(e) => handlePriorityFilter(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button
            type="button"
            className="w-full sm:w-auto px-6 py-2 bg-black text-white rounded-md text-center hover:scale-105 transition-transform"
            onClick={() => {
              setShowTaskModal(true);
            }}
          >
            + Create Task
          </button>
        </div>
      </div>

      {applyingFilter && (
        <p className="px-2 sm:px-8 pt-2 text-sm text-gray-500">
          Applying filter...
        </p>
      )}

      {/* Columns */}
      <div className="flex flex-col lg:flex-row gap-4 py-6 sm:py-8 px-2 sm:px-4">
        {board.columns.map((column) => {
          const visibleTasks = getColumnTasks(column);
          return (
            // Column Div
            <div
              key={column.id}
              className="ColumnsDiv bg-white border border-gray-400 rounded-lg p-4 w-full lg:w-[30%] min-h-50 lg:h-150 flex flex-col"
            >
              <div className="flex items-center gap-3 border-b border-gray-400 mb-4">
                <h2 className="text-base sm:text-lg font-semibold my-2">
                  {column.name}
                </h2>
                <span className="countTask w-2 h-2 bg-gray-500 text-white rounded-full flex items-center text-center justify-center p-2.5 ">
                  {visibleTasks.length}
                </span>
              </div>
              {/* All Task Card Wrapper */}
              <div className="h-full max-h-[70vh] lg:max-h-none overflow-y-auto">
                {visibleTasks.map((task) => (
                  // Render Task as Card
                  <div
                    key={task.id}
                    className="CardDiv bg-yellow-4000 border border-gray-400 rounded-lg flex flex-col gap-2 my-2 p-4"
                  >
                    <h3 className="text-lg sm:text-xl font-semibold wrap-break-words">
                      {task.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500 wrap-break-words">
                      {task.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`${
                          task.priority == "High"
                            ? "bg-red-200 text-red-600 border border-red-600"
                            : task.priority == "Medium"
                              ? "bg-yellow-200 text-yellow-600 border border-yellow-600"
                              : "bg-green-200 text-green-600 border border-green-600"
                        } w-min px-3 py-0.5 text-center rounded-full text-xs font-semibold whitespace-nowrap`}
                      >
                        {task.priority}
                      </span>
                      <h5 className="text-xs font-semibold text-gray-600">
                        {task.created_at}
                      </h5>
                    </div>
                    <div className="CRUD_Action py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-t border-gray-600">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <label className="block text-xs font-medium text-black">
                          Move to :
                        </label>
                        <select
                          className="w-full sm:w-auto rounded-lg border border-gray-700 bg-white text-xs text-black shadow-sm transition-all focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300/20"
                          onChange={(e) =>
                            handleMoveTask(task.id, Number(e.target.value))
                          }
                        >
                          <option value={0}>Select Column</option>
                          <option value={1}>To Do</option>
                          <option value={2}>In Progress</option>
                          <option value={3}>Done</option>
                        </select>
                      </div>
                      <div className="deleteAndEditButton flex gap-4 self-end sm:self-auto">
                        <button
                          type="button"
                          className="editButton group"
                          onClick={() => {
                            setEditSelectTaskModal(task);
                          }}
                        >
                          <FaRegEdit size={18} className="hover:scale-115" />
                        </button>
                        <button
                          type="button"
                          className="deleteButton group"
                          onClick={() => handleDeleteTask(task)}
                        >
                          <RiDeleteBin6Line
                            size={18}
                            className="hover:scale-115"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* taskModal for creating Task */}
      {showTaskModal && (
        <TaskModal
          columns={board.columns}
          onClose={() => setShowTaskModal(false)}
          onTaskCreated={() => {
            setShowTaskModal(false);
            loadBoard();
          }}
        />
      )}

      {/* edit Modal for edit existing Task */}
      {editSelectTaskModal && (
        <EditTaskModal
          columns={board.columns}
          tasks={editSelectTaskModal}
          onClose={() => setEditSelectTaskModal(null)}
          onTaskUpdated={() => {
            setEditSelectTaskModal(null);
            loadBoard();
          }}
        />
      )}
    </main>
  );
};

export default Board;
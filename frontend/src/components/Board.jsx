import React, { useState, useEffect } from "react";
import { getBoard } from "../services/taskApi";
import TaskModal from "./TaskModal";

const Board = () => {
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);

  const loadBoard = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getBoard(1);
      // console.log("data :: ", data);
      setBoard(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadBoard();
  }, []);

  if (loading) {
    return <p>Loading Board...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <main className="bg-white p-8 h-screen w-screen overflow-hidden">
      <div className="flex justify-between items-center px-8">
        <h1 className="text-2xl font-semibold">{board.name}</h1>
        <button
          type="button"
          className="px-6 py-2 bg-black text-white rounded-md text-center hover:scale-105 "
          onClick={() => {
            // console.log("button clicked ");
            setShowTaskModal(true);
          }}
        >
          + Create Task
        </button>
      </div>
      <div className="bg-blue-5000 flex justify-around gap-2 py-8 px-4 ">
        {board.columns.map((column) => (
          <div
            key={column.id}
            className="bg-red-4000 border border-gray-400 rounded-lg p-4 w-[30%] h-150 flex flex-col"
          >
            <div className="flex items-center gap-3 border-b border-gray-400 mb-4">
              <h2 className="text-lg font-semibold my-2">{column.name}</h2>
              <span className="countTask w-2 h-2 bg-gray-500 text-white rounded-full flex items-center text-center justify-center p-2.5 ">
                4
              </span>
            </div>
            <div className="bg-violet-5000 h-full overflow-y-auto">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-yellow-4000 border border-gray-400  rounded-lg flex flex-col gap-2 my-2 p-4"
                >
                  <h3 className="text-xl font-semibold">{task.title}</h3>
                  <p className="text-base text-gray-500">{task.description}</p>
                  <div className="flex justify-between ">
                    <span
                      className={`${task.priority == "High" ? "bg-red-200 text-red-600 border border-red-600" : task.priority == "Medium" ? "bg-yellow-200 text-yellow-600 border border-yellow-600" : "bg-green-200 text-green-600 border border-green-600"} w-min px-3 py-0.5 text-center rounded-full text-xs font-semibold`}
                    >
                      {task.priority}
                    </span>
                    <h5 className="text-xs font-semibold text-gray-600">
                      {task.created_at}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
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
    </main>
  );
};

export default Board;

const API_URL = true ?"https://taskflow-u5xn.onrender.com/api":"http://localhost:9000/api";

export const getBoard = async (boardId) => {
  const response = await fetch(`${API_URL}/boards/${boardId}`);
  // console.log("response :: ",response);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to load board");
  }
  return data;
};

export const taskCountPerColumn = async (boardId) => {
  const response = await fetch(`${API_URL }/boards/${boardId}/countTask`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to load board");
  }
  return data;
};

export const createTask = async (taskData) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    body: JSON.stringify(taskData),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to Create task");
  }
  return data;
};

export const updateTask = async (taskId, taskData) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to update task");
  }

  return data;
};

export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to Delete Task");
  }
  return data;
};

export const moveTask = async (taskId, columnId) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}/move`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      column_id: Number(columnId),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to move task");
  }

  return data;
};

export const getTasks = async (priority = "") => {
  const url = priority
    ? `${API_URL}/tasks?priority=${encodeURIComponent(priority)}`
    : `${API_URL}/tasks`;

  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch tasks");
  }

  return data;
};

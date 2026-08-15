const API_URL = "http://localhost:9000/api";

export const getBoard = async (boardId) => {
  const response = await fetch(`${API_URL}/boards/${boardId}`);
  // console.log("response :: ",response);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const createTask = async (taskData) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    body: JSON.stringify(taskData),
    headers: { "Content-Type": "application/json" },
  });
  
  if(!response.ok){
    throw new Error(response.statusText)
  }
};

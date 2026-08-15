const API_URL = "http://localhost:9000/api";

export const getBoard = async (boardId) => {
  const response = await fetch(`${API_URL}/boards/${boardId}`);
  // console.log("response :: ",response);
  if (!response.ok) {
    throw new Error("Failed to fetch board");
  }
  return response.json();
};

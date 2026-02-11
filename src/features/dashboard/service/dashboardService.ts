import api from "../../../service/api";

export async function getResults() {
  const response = await api.get("/results");
  return response.data;
}

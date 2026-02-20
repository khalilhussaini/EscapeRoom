import api from "./api";

export interface Mission {
  mission: string;
  question: string;
  hint: string;
}

export const getMissionById = async (id: string): Promise<Mission> => {
  const response = await api.get(`/missions/${id}`);
  return response.data;
};

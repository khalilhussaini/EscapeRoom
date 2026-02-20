import api from "./api";

export const checkAllMissionsCompleted = async (): Promise<boolean> => {
  try {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      console.error("No user ID found");
      return false;
    }

    // Fetch all missions
    const missionsResponse = await api.get("/missions");
    const allMissions = missionsResponse.data;

    // Check completion status for each mission
    const completionChecks = await Promise.all(
      allMissions.map(async (mission: { id: number }) => {
        try {
          const response = await api.get(`/missions/${mission.id}`, {
            params: { userId },
          });
          return response.data.alreadyCompleted === true;
        } catch (error) {
          console.error(`Error checking mission ${mission.id}:`, error);
          return false;
        }
      }),
    );

    // All missions must be completed
    const allCompleted = completionChecks.every(
      (completed) => completed === true,
    );
    console.log("All missions completed:", allCompleted);

    return allCompleted;
  } catch (error) {
    console.error("Error checking mission completion:", error);
    return false;
  }
};

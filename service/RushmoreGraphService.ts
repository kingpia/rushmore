import axios from "axios";
import { UserRushmore } from "../model/UserRushmore";

export class RushmoreGraphService {
  private baseURL: string = "http://192.168.0.11:8080"; // Hardcoded base URL

  async getInProgressRushmoreList(uid: string): Promise<UserRushmore[]> {
    try {
      const response = await axios.post(`${this.baseURL}/graphql`, {
        query: `
        query {
            inProgressUserRushmoresByUid(uid: "${uid}") {
                createdDt
                gameType
                rushmoreType
                urId
                userId
                visibility
                rushmore {
                  title
                  rid
                  category
                  icon
                }
            }
        }
        `,
      });
      console.log(
        "OUTPUT:" +
          JSON.stringify(response.data.data.inProgressUserRushmoresByUid)
      );
      return response.data.data.inProgressUserRushmoresByUid;
    } catch (error) {
      console.error("Error fetching in-progress Rushmore list:", error);
      throw error;
    }
  }

  async getCompletedRushmoreList(uid: string): Promise<UserRushmore[]> {
    try {
      const response = await axios.post(`${this.baseURL}/graphql`, {
        query: `
        query {
            completedUserRushmoresByUid(uid: "${uid}") {
                rushmore {
                    title
                    rid
                    icon
                  }
                  completedCount
                  completedDt
                  createdDt
                  firstCompletedDt
                  firstCompletedUser {
                    userName
                  }
                  firstCompletedUid
                  gameType
                  highScore
                  highScoreUid
                  highScoreUser {
                    userName
                  }
                  rushmoreType
                  urId
                  userId
                  version
                  visibility
            }
        }
      `,
      });
      console.log("OUTPUT:" + response.data);

      return response.data.data.completedUserRushmoresByUid;
    } catch (error) {
      console.error("Error fetching completed Rushmore list:", error);
      throw error;
    }
  }
}

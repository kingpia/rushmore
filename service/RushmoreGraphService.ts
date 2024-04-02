import axios from "axios";
import { UserRushmore } from "../model/UserRushmore";

export class RushmoreGraphService {
  private baseURL: string = "http://192.168.0.11:8080"; // Hardcoded base URL

  async getMyInProgressRushmoreList(): Promise<UserRushmore[]> {
    console.log("getMyInprogressRushmores");
    try {
      const response = await axios.post(`${this.baseURL}/graphql`, {
        query: `
        query {
            myInProgressUserRushmores {
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
        "OUTPUT:" + JSON.stringify(response.data.data.myInProgressUserRushmores)
      );
      return response.data.data.myInProgressUserRushmores;
    } catch (error) {
      console.error("Error fetching in-progress Rushmore list:", error);
      throw error;
    }
  }

  async getMyCompletedRushmoreList(): Promise<UserRushmore[]> {
    console.log("getMyCompletedRushmoreList");

    try {
      const response = await axios.post(`${this.baseURL}/graphql`, {
        query: `
        query {
            myCompletedUserRushmores {
                rushmore {
                    title
                    rid
                    icon
                    category
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

      return response.data.data.myCompletedUserRushmores;
    } catch (error) {
      console.error("Error fetching completed Rushmore list:", error);
      throw error;
    }
  }
}

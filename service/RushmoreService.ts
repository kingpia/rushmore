import { ApiFetchEnums } from "../model/ApiFetchEnums";
import { LetterSelectionResponse } from "../model/LetterSelectionResponse";
import { RushmoreGameTypeEnums } from "../model/RushmoreGameTypeEnums";
import { RushmoreType } from "../model/RushmoreTypeEnums";
import { RushmoreVisibilityEnums } from "../model/RushmoreVisibilityEnums";
import { UserRushmore } from "../model/UserRushmore";
import { UserRushmoreDTO } from "../model/UserRushmoreDTO";
import { UserRushmoreGameSession } from "../model/UserRushmoreGameSession";
import {
  rushmoreListURL,
  yourCompletedRushmoreListURL,
} from "../sampleDataConfig";
import api from "./api";

export class RushmoreService<T> {
  private baseURL: string = "http://192.168.0.11:8080"; // Hardcoded base URL

  async getRushmoreItems(uid: string, toFetch: ApiFetchEnums): Promise<T[]> {
    try {
      let data: T[] = [];
      let endpoint = "";

      if (toFetch === ApiFetchEnums.YOUR_IN_PROGRESS_RUSHMORE_LIST) {
        endpoint = `/inProgressUserRushmores/${uid}`;
        const response = await api.get<T[]>(`${this.baseURL}${endpoint}`);
        return response.data;
        //data = require("../sampleApiData/yourInProgressRushmoreList.json");
      } else if (toFetch === ApiFetchEnums.YOUR_COMPLETED_RUSHMORE_LIST) {
        endpoint = `/completedUserRushmores/${uid}`;
        const response = await api.get<T[]>(`${this.baseURL}${endpoint}`);
        return response.data;

        //data = require("../sampleApiData/yourCompletedRushmoreList.json");
      } else if (
        toFetch === ApiFetchEnums.FOLLOWING_IN_PROGRESS_RUSHMORE_LIST
      ) {
        data = require("../sampleApiData/followingRushmoreInProgressList.json");
      } else if (toFetch === ApiFetchEnums.FOLLOWING_SOLVED_RUSHMORE_LIST) {
        data = require("../sampleApiData/followingRushmoreSolvedList.json");
      } else if (toFetch === ApiFetchEnums.USER_RUSHMORE_LIST) {
        data = require("../sampleApiData/followingRushmoreSolvedList.json");
      } else if (toFetch === ApiFetchEnums.RUSHMORE_LIST) {
        data = require("../sampleApiData/rushmores.json");
      } else {
        throw new Error(`Unsupported enum value: ${toFetch}`);
      }

      return data;
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
      throw error; // Re-throw the error for the component to handle
    }
  }

  async getYourCompletedRushmore(
    uid: string,
    urId: number
  ): Promise<UserRushmore> {
    console.log("getYourCompletedRushmore(uid:" + uid + ", urId" + urId + ")");
    try {
      let data: UserRushmore;

      data = require("../sampleApiData/rushmoreListData/yourCompletedRushmore.json");

      return data;
    } catch (error) {
      console.error("Error fetching getYourCompletedRushmore :", error);
      throw error; // Re-throw the error for the component to handle
    }
  }

  // Inside RushmoreService class
  async letterSelection(
    urgsId: number,
    userId: string
  ): Promise<LetterSelectionResponse> {
    try {
      // Simulate a pause (replace with an actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Your logic for letter selection
      // This is just an example, replace it with your actual logic
      const updatedScore = Math.floor(Math.random() * 100000) + 1;
      console.log("Getting letter selection");
      // Return the response
      return {
        responseCode: "SUCCESS",
        updatedScore,
      };
    } catch (error) {
      console.error("Error in letterSelection:", error);
      throw error;
    }
  }

  // Inside RushmoreService class
  async getUserRushmoreGameSession(
    urgsid: number,
    uid: string
  ): Promise<UserRushmoreGameSession> {
    // Simulate a 2-second delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const isUrIdEven = urgsid % 2 === 0;

    //For mocking, even means new
    if (isUrIdEven) {
      //New empty item
      let data: UserRushmoreGameSession = require("../sampleApiData/gameData/userRushmoreGameSession.json");
      return data;
    } else {
      // Mock response for odd urId
      return {
        createdDt: new Date(),
        urgsId: 1,
        user: {
          id: "123",
          userName: "testuser",
          name: "",
          followingCount: 0,
          followerCount: 0,
          friendCount: 0,
          likeCount: 0,
          socialStatus: "",
        },
        userRushmore: {
          urId: 661,
          user: {
            id: "",
            userName: "",
            name: "",
            followingCount: 0,
            followerCount: 0,
            friendCount: 0,
            likeCount: 0,
            socialStatus: "",
          },
          rushmore: {
            rid: 0,
            title: "",
            rushmoreCategory: "",
            timesCompleted: 0,
            icon: "",
          },
          visibility: RushmoreVisibilityEnums.PRIVATE,
          gameType: RushmoreGameTypeEnums.GAME,
          rushmoreType: RushmoreType.Favorite,
          createdDt: new Date(),
          completedDt: new Date(),
          likeCount: 0,
          completedCount: 0,
          icon: "",
          highScoreUser: {
            id: "",
            userName: "",
            name: "",
            followingCount: 0,
            followerCount: 0,
            friendCount: 0,
            likeCount: 0,
            socialStatus: "",
          },
          highScore: 0,
          version: 0,
          userRushmoreItemList: [],
          firstToCompleteUser: {
            id: "",
            userName: "",
            name: "",
            followingCount: 0,
            followerCount: 0,
            friendCount: 0,
            likeCount: 0,
            socialStatus: "",
          },
          firstCompletedDt: new Date(),
        },
        completedDt: new Date(),
        score: 50000,
        letterSelection: "TMS",
        letterSelectionComplete: "N",
        userRushmoreGameSessionItemList: [
          {
            urgsiId: 1,
            urgsId: 101,
            uriItemTitle: "Lord of The Rings - Return of the King",
            currentIndex: 2,
          },
          {
            urgsiId: 2,
            urgsId: 102,
            uriItemTitle: "The Matrix",
            currentIndex: 0,
          },
          {
            urgsiId: 3,
            urgsId: 103,
            uriItemTitle: "Fight Club",
            currentIndex: 1,
          },
        ],
      };
    }
  }

  // Inside RushmoreService class
  async getUserRushmore(
    urId: number,
    requestingUid: string
  ): Promise<UserRushmore> {
    console.log("Getuserrushmore(urId:" + urId + ")");
    try {
      // Simulate a 3-second delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      if (urId === 6661) {
        console.log("returning completed user rushmore");
        let data: UserRushmore = require("../sampleApiData/completedUserRushmore.json");
        // Mock response
        return data;
      } else {
        let data: UserRushmore = require("../sampleApiData/inProgressUserRushmore.json");
        // Mock response
        return data;
      }
    } catch (error) {
      console.error("Error fetching user rushmore:", error);
      throw error;
    }
  }

  async getMyInProgressUserRushmoreGameSessions(): Promise<
    UserRushmoreGameSession[]
  > {
    try {
      const response = await api.post(`${this.baseURL}/graphql`, {
        query: `
        query {
          myInProgressUserRushmoreGameSessions {
            completedDt
            score
            updatedBy
            updatedDt
            urgsId
            userId
            letterSelection
            letterSelectionComplete
            userRushmore {
              gameType
              completedCount
              highScore
              highScoreUid
              highScoreUser {
                nickName
                uid
                userName
              }
              rushmore {
                category
                icon
                rid
                title
              }
              rushmoreType
              urId
              userId
              version
              ownerUser {
                nickName
                uid
                userName
              }
            }
          }
      }
      `,
      });
      return response.data.data.myInProgressUserRushmoreGameSessions;
    } catch (error) {
      console.error("Error unfollowing user:", error);
      throw error;
    }
  }

  async getMySolvedUserRushmoreGameSessions(): Promise<
    UserRushmoreGameSession[]
  > {
    try {
      const response = await api.post(`${this.baseURL}/graphql`, {
        query: `
        query {
          mySolvedUserRushmoreGameSessions {
            completedDt
            score
            updatedBy
            updatedDt
            urgsId
            userId
            letterSelection
            letterSelectionComplete
            userRushmore {
              gameType
              completedCount
              highScore
              highScoreUid
              highScoreUser {
                nickName
                uid
                userName
              }
              rushmore {
                category
                icon
                rid
                title
              }
              rushmoreType
              urId
              userId
              version
              ownerUser {
                nickName
                uid
                userName
              }
            }
          }
      }
      `,
      });
      return response.data.data.mySolvedUserRushmoreGameSessions;
    } catch (error) {
      console.error("Error unfollowing user:", error);
      throw error;
    }
  }

  async getMyBookmarkedUserRushmores(): Promise<UserRushmoreDTO[]> {
    console.log("getMyBookmarkedUserRushmores");
    try {
      const response = await api.post(`${this.baseURL}/graphql`, {
        query: `
        query {
          myBookmarkedUserRushmores {
            userRushmore {
              completedCount
              firstCompletedDt
              firstCompletedUid
              firstCompletedUser {
                nickName
                uid
                userName
              }
              gameType
              highScore
              highScoreUid
              highScoreUser {
                nickName
                uid
                userName
              }
              likeCount
              ownerUser {
                userName
                uid
              }
              rushmore {
                category
                icon
                rid
                title
              }
              rushmoreType
              urId
              completedDt
              version
            }
            userRushmoreGameSession {
              score
              urgsId
              completedDt
              createdDt
            }
          }
      }
      `,
      });
      return response.data.data.myBookmarkedUserRushmores;
    } catch (error) {
      console.error("Error unfollowing user:", error);
      throw error;
    }
  }

  async getMyLikedUserRushmores(): Promise<UserRushmoreDTO[]> {
    try {
      const response = await api.post(`${this.baseURL}/graphql`, {
        query: `
        query {
          myLikedUserRushmores {
            userRushmore {
              completedCount
              firstCompletedDt
              firstCompletedUid
              firstCompletedUser {
                nickName
                uid
                userName
              }
              gameType
              highScore
              highScoreUid
              highScoreUser {
                nickName
                uid
                userName
              }
              likeCount
              ownerUser {
                userName
                uid
              }
              rushmore {
                category
                icon
                rid
                title
              }
              rushmoreType
              urId
              completedDt
              version
            }
            userRushmoreGameSession {
              score
              urgsId
              completedDt
              createdDt
            }
          }
      }
      `,
      });
      return response.data.data.myLikedUserRushmores;
    } catch (error) {
      console.error("Error unfollowing user:", error);
      throw error;
    }
  }

  async getMyInProgressRushmoreList(): Promise<UserRushmoreDTO[]> {
    console.log("getMyInprogressRushmores");
    try {
      const response = await api.post(`${this.baseURL}/graphql`, {
        query: `
        query {
            myInProgressUserRushmores {
              userRushmore {
                createdDt
                completedDt
                highScore
                highScoreUid
                highScoreUser {
                  nickName
                  uid
                  userName
                }
                likeCount
                rushmore {
                  category
                  icon
                  rid
                  title
                }
                rushmoreType
                gameType
                urId
                version
                visibility
                firstCompletedDt
                firstCompletedUid
                firstCompletedUser {
                  nickName
                  uid
                  userName
                }
              }
              userRushmoreGameSession {
                urgsId
                userId
                userRushmoreId
                completedDt
                score
                letterSelection
                letterSelectionComplete
                createdDt
                createdBy
                updatedDt
                updatedBy
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

  async getMyCompletedRushmoreList(): Promise<UserRushmoreDTO[]> {
    console.log("getMyCompletedRushmoreList");

    try {
      const response = await api.post(`${this.baseURL}/graphql`, {
        query: `
        query {
          myCompletedUserRushmores {
            userRushmore {
              completedDt
              highScore
              highScoreUid
              highScoreUser {
                nickName
                uid
                userName
              }
              likeCount
              rushmore {
                category
                icon
                rid
                title
              }
              rushmoreType
              completedCount
              urId
              version
              visibility
              firstCompletedDt
              firstCompletedUid
              firstCompletedUser {
                nickName
                uid
                userName
              }
            }
            userRushmoreGameSession {
              urgsId
              userId
              userRushmoreId
              completedDt
              score
              letterSelection
              letterSelectionComplete
              createdDt
              createdBy
              updatedDt
              updatedBy
            }
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

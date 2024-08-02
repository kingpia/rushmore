import { AxiosResponse } from "axios";
import { CreateUserRushmoreDetailResponseDTO } from "../model/CreateUserRushmoreDetailResponseDTO";
import { CreateUserRushmoreRequestDTO } from "../model/CreateUserRushmoreRequestDTO";
import { LetterSelectionResponse } from "../model/LetterSelectionResponse";
import { UserRushmore } from "../model/UserRushmore";
import { UserRushmoreDTO } from "../model/UserRushmoreDTO";
import { RushmoreItem } from "../model/RushmoreItem";
import api from "./api";
import { UserRushmoreInitialCreateDTO } from "../model/UserRushmoreInitialCreateDTO";
import { UserLikeResponseDTO } from "../model/UserLikeResponseDTO";
import { UserLike } from "../model/UserLike";
import { UserRushmoreViewComplete } from "../model/UserRushmoreViewComplete";
import { UserRushmoreViewCompleteResponseDTO } from "../model/UserRushmoreViewCompleteResponseDTO";
import { BASE_URL } from "../config"; // Import the constants

interface GraphQLError {
  message: string;
  locations: { line: number; column: number }[];
  path: string[];
  extensions: { classification: string };
}

export class RushmoreService<T> {
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

  async getUserRushmore(urId: string): Promise<UserRushmoreDTO> {
    try {
      const response = await api.post(`${BASE_URL}/graphql`, {
        query: `
        query {
          getUserRushmore(urId: "${urId}") {
            userRushmore {
              createdBy
              completedCount
              completedDt
              createdDt
              firstCompletedDt
              firstCompletedUid
              firstCompletedUser {
                nickName
                userName
                uid
              }
              gameType
              highScore
              highScoreUid
              highScoreUser {
                nickName
                userName
                uid
              }
              itemCount
              likeCount
              ownerUser {
                nickName
                uid
                userName
              }
              rushmore {
                category
                icon
                completedCount
                title
                price
                rid
              }
              rushmoreType
              uid
              updatedBy
              updatedDt
              urId
              displayVersion
              version
              visibility
              itemList {
                item
                rank
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
            liked
          }
        }
      `,
      });
      return response.data.data.getUserRushmore;
    } catch (error) {
      console.error("Error unfollowing user:", error);
      throw error;
    }
  }

  async getMyInProgressUserRushmoreGameSessions(): Promise<UserRushmoreDTO[]> {
    try {
      const response = await api.post(`${BASE_URL}/graphql`, {
        query: `
        query {
          myInProgressUserRushmoreGameSessions {
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
              displayVersion
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
      return response.data.data.myInProgressUserRushmoreGameSessions;
    } catch (error) {
      console.error("Error unfollowing user:", error);
      throw error;
    }
  }

  async getMySolvedUserRushmoreGameSessions(): Promise<UserRushmoreDTO[]> {
    try {
      const response = await api.post(`${BASE_URL}/graphql`, {
        query: `
        query {
          mySolvedUserRushmoreGameSessions {
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
      return response.data.data.mySolvedUserRushmoreGameSessions;
    } catch (error) {
      console.error("Error unfollowing user:", error);
      throw error;
    }
  }

  async getMyBookmarkedUserRushmores(): Promise<UserRushmoreDTO[]> {
    console.log("getMyBookmarkedUserRushmores");
    try {
      const response = await api.post(`${BASE_URL}/graphql`, {
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
              bookmarkCount
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
      const response = await api.post(`${BASE_URL}/graphql`, {
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
      const response = await api.post(`${BASE_URL}/graphql`, {
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
            }
        }
        `,
      });

      return response.data.data.myInProgressUserRushmores;
    } catch (error) {
      console.error("Error fetching in-progress Rushmore list:", error);
      throw error;
    }
  }

  async getMyCompletedRushmoreList(): Promise<UserRushmoreDTO[]> {
    console.log("getMyCompletedRushmoreList");

    try {
      const response = await api.post(`${BASE_URL}/graphql`, {
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
              bookmarkCount
              urId
              version
              displayVersion
              visibility
              firstCompletedDt
              firstCompletedUid
              firstCompletedUser {
                nickName
                uid
                userName
              }
            }
          }
        }
      `,
      });

      return response.data.data.myCompletedUserRushmores;
    } catch (error) {
      console.error("Error fetching completed Rushmore list:", error);
      throw error;
    }
  }

  async getRushmores(): Promise<CreateUserRushmoreDetailResponseDTO> {
    console.log("getRushmores");

    try {
      const response = await api.post(`${BASE_URL}/graphql`, {
        query: `
        query {
          getRushmores {
            rushmoreList {
              rid
              title
              category
              icon
              completedCount
              price
            }
            userRushmoreList {
              urId
              completedDt,
              rushmoreType
              rushmore{
                rid
              }
            }
          }
        }
      `,
      });
      console.log("OUTPUT:" + response.data);

      return response.data.data.getRushmores;
    } catch (error) {
      console.error("Error fetching completed Rushmore list:", error);
      throw error;
    }
  }

  async createUserRushmore(
    createUserRushmoreRequest: CreateUserRushmoreRequestDTO
  ): Promise<UserRushmoreInitialCreateDTO> {
    try {
      console.log("CreateUserRushmore");
      const response: AxiosResponse<{
        data: { createUserRushmore: any };
        errors?: GraphQLError[];
      }> = await api.post(`${BASE_URL}/graphql`, {
        query: `
            mutation {
              createUserRushmore(
                request: {rid: "${createUserRushmoreRequest.rid}", visibility: "${createUserRushmoreRequest.visibility}", gameType: "${createUserRushmoreRequest.gameType}", type:"${createUserRushmoreRequest.type}"}
              ) {
                userRushmore {
                  gameType
                  rushmore {
                    rid
                    title
                  }
                  urId
                  version
                  visibility
                  createdDt
                  updatedDt
                }
              }
            }
          `,
      });

      if (response.data.errors) {
        // Handle GraphQL errors
        var errorMessage = "";

        //Problem here, which error do we display, we are assuming only 1
        response.data.errors.forEach((error: GraphQLError) => {
          console.error("GraphQL error:", error.message);
          // You can also log additional information such as error locations and path if needed
          console.error("Error locations:", error.locations);
          console.error("Error path:", error.path);
          errorMessage = error.message;
        });

        // Throw an error or handle the errors as needed
        throw new Error(errorMessage);
      }

      // No errors, return the user data
      return response.data.data.createUserRushmore;
    } catch (error) {
      // Handle network errors or unexpected errors
      console.error("Error updating user name:", error);
      throw error;
    }
  }

  async getRushmoreItemInitialList(
    rid: string,
    size: number,
    from: number
  ): Promise<RushmoreItem[]> {
    console.log("getRushmoreItemInitialList");

    try {
      const response = await api.post(`${BASE_URL}/graphql`, {
        query: `
        query {
          getRushmoreItemInitialList(rid: "${rid}", size: ${size} from: ${from}) {
            primary
          }
        }
      `,
      });
      console.log("OUTPUT:" + JSON.stringify(response.data.data));

      return response.data.data.getRushmoreItemInitialList;
    } catch (error) {
      console.error("Error fetching completed Rushmore list:", error);
      throw error;
    }
  }

  async editUserRushmore(userRushmore: UserRushmore): Promise<UserRushmore> {
    console.log("editUserRushmoreItems:", JSON.stringify(userRushmore));
    try {
      const response: AxiosResponse<{
        data: { editUserRushmore: UserRushmore };
        errors?: GraphQLError[];
      }> = await api.post(`${BASE_URL}/graphql`, {
        query: `
          mutation($request: EditUserRushmoreRequestDTO!) {
            editUserRushmore(request: $request) {
              urId
              uid
              rushmore {
                icon
                price
                rid
                title
              }
              ownerUser {
                nickName
                uid
                userName
              }
              visibility
              gameType
              rushmoreType
              createdDt
              version
              itemList {
                item
                rank
              }
            }
          }
        `,
        variables: {
          request: {
            urId: userRushmore.urId,
            itemList: userRushmore.itemList.map((item) => ({
              item: item.item,
              rank: item.rank,
            })),
            visibility: userRushmore.visibility,
            rushmoreType: userRushmore.rushmoreType,
            gameType: userRushmore.gameType,
          },
        },
      });

      if (response.data.errors) {
        // Handle GraphQL errors
        const errorMessage = response.data.errors[0].message;
        console.error("GraphQL error:", errorMessage);
        throw new Error(errorMessage);
      }

      console.log(
        "Edited user Rushmore and got response:",
        JSON.stringify(response.data.data.editUserRushmore)
      );

      // No errors, return the user data
      return response.data.data.editUserRushmore;
    } catch (error) {
      // Handle network errors or unexpected errors
      console.error("Error updating user Rushmore", error);
      throw error;
    }
  }

  async incrementAndEditUserRushmore(
    userRushmore: UserRushmore
  ): Promise<UserRushmore> {
    console.log("incrementAndEditUserRushmore:", JSON.stringify(userRushmore));
    try {
      const response: AxiosResponse<{
        data: { incrementAndEditUserRushmore: UserRushmore };
        errors?: GraphQLError[];
      }> = await api.post(`${BASE_URL}/graphql`, {
        query: `
          mutation($request: EditUserRushmoreRequestDTO!) {
            incrementAndEditUserRushmore(request: $request) {
              urId
              uid
              rushmore {
                icon
                price
                rid
                title
              }
              ownerUser {
                nickName
                uid
                userName
              }
              visibility
              gameType
              rushmoreType
              createdDt
              completedDt
              version
              itemList {
                item
                rank
              }
            }
          }
        `,
        variables: {
          request: {
            urId: userRushmore.urId,
            itemList: userRushmore.itemList.map((item) => ({
              item: item.item,
              rank: item.rank,
            })),
            visibility: userRushmore.visibility,
            rushmoreType: userRushmore.rushmoreType,
            gameType: userRushmore.gameType,
            displayVersion: userRushmore.displayVersion,
          },
        },
      });

      if (response.data.errors) {
        // Handle GraphQL errors
        const errorMessage = response.data.errors[0].message;
        console.error("GraphQL error:", errorMessage);
        throw new Error(errorMessage);
      }

      console.log(
        "Incremented Rushmore and got response:",
        JSON.stringify(response.data.data.incrementAndEditUserRushmore)
      );

      // No errors, return the user data
      return response.data.data.incrementAndEditUserRushmore;
    } catch (error) {
      // Handle network errors or unexpected errors
      console.error("Error updating user Rushmore", error);
      throw error;
    }
  }

  async publishUserRushmore(userRushmore: UserRushmore): Promise<UserRushmore> {
    try {
      console.log(
        "Publish User Rushmore:" + JSON.stringify(userRushmore, null, 2)
      );
      const response: AxiosResponse<{
        data: { publishUserRushmore: UserRushmore };
        errors?: GraphQLError[];
      }> = await api.post(`${BASE_URL}/graphql`, {
        query: `
          mutation($request: EditUserRushmoreRequestDTO!) {
            publishUserRushmore(request: $request) {
              urId
              uid
              rushmore {
                icon
                price
                rid
                title
              }
              ownerUser {
                nickName
                uid
                userName
              }
              visibility
              gameType
              rushmoreType
              createdDt
              version
              itemList {
                item
                rank
              }
            }
          }
        `,
        variables: {
          request: {
            urId: userRushmore.urId,
            itemList: userRushmore.itemList.map((item) => ({
              item: item.item,
              rank: item.rank,
            })),
            visibility: userRushmore.visibility,
            rushmoreType: userRushmore.rushmoreType,
            displayVersion: userRushmore.displayVersion,
            gameType: userRushmore.gameType,
          },
        },
      });

      if (response.data.errors) {
        // Handle GraphQL errors
        const errorMessage = response.data.errors[0].message;
        console.error("GraphQL error:", errorMessage);
        throw new Error(errorMessage);
      }

      console.log(
        "Edited user Rushmore and got response:",
        JSON.stringify(response.data.data.publishUserRushmore)
      );
      // No errors, return the user data
      return response.data.data.publishUserRushmore;
    } catch (error) {
      // Handle network errors or unexpected errors
      console.error("Error updating user name:", error);
      throw error;
    }
  }

  async getRushmoreItemBySearchString(
    rid: string,
    searchString: string
  ): Promise<RushmoreItem[]> {
    console.log("getRushmoreItemBySearchString");

    try {
      const response = await api.post(`${BASE_URL}/graphql`, {
        query: `
        query {
          getRushmoreItemBySearchString(rid: "${rid}", searchString:"${searchString}") {
            primary
          }
        }
      `,
      });
      console.log("OUTPUT:" + JSON.stringify(response.data.data));

      return response.data.data.getRushmoreItemBySearchString;
    } catch (error) {
      console.error("Error fetching completed Rushmore list:", error);
      throw error;
    }
  }

  async getUserRushmoreVersionList(urId: string): Promise<UserRushmoreDTO[]> {
    console.log("getUserRushmoreVersionList");

    try {
      const response = await api.post(`${BASE_URL}/graphql`, {
        query: `
        query GetUserRushmoreVersionList($urId: String!) {
          getUserRushmoreVersionList(urId: $urId) {
            userRushmore {
              completedDt
              uid
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
              bookmarkCount
              urId
              version
              displayVersion
              visibility
              firstCompletedDt
              firstCompletedUid
              firstCompletedUser {
                nickName
                uid
                userName
              }
            }
          }
        }
      `,
        variables: {
          urId,
        },
      });

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      return response.data.data.getUserRushmoreVersionList;
    } catch (error) {
      console.error("Error fetching getUserRushmoreVersionList:", error);
      throw error;
    }
  }

  async getUserRushmoreLikeList(
    userLike: UserLike,
    limit: number
  ): Promise<UserLikeResponseDTO[]> {
    console.log(
      "getUserRushmoreLikeList with Data:" + JSON.stringify(userLike, null, 2)
    );

    try {
      const response = await api.post(`${BASE_URL}/graphql`, {
        query: `
        query GetUserRushmoreLikeList($userLikeInput: UserLikeInput!, $limit: Int!) {
          getUserRushmoreLikeList(userLikeInput: $userLikeInput, limit: $limit) {
            socialUserResponseDTO {
              followersCount
              following
              followingCount
              nickName
              profileImagePath
              socialRelationship {
               isFollowed
               isFollowing
              }
              uid
              userRushmoreCount
              userName
            }
            userLike {
              urId
              uid
              createdDt
            }
          }
        }
      `,
        variables: {
          userLikeInput: {
            urId: userLike.urId,
            uid: userLike.uid,
            createdDt: userLike.createdDt,
          },
          limit,
        },
      });

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      return response.data.data.getUserRushmoreLikeList;
    } catch (error) {
      console.error("Error fetching user rushmore like list:", error);
      throw error;
    }
  }

  async getUserRushmoreViewCompleteList(
    userRushmoreViewComplete: UserRushmoreViewComplete,
    limit: number
  ): Promise<UserRushmoreViewCompleteResponseDTO[]> {
    console.log(
      "getUserRushmoreViewCompleteList with Data:" +
        JSON.stringify(userRushmoreViewComplete, null, 2)
    );

    try {
      const response = await api.post(`${BASE_URL}/graphql`, {
        query: `
        query GetUserRushmoreViewCompleteList($userRushmoreViewCompleteInput: UserRushmoreViewCompleteInput!, $limit: Int!) {
          getUserRushmoreViewCompleteList(userRushmoreViewCompleteInput: $userRushmoreViewCompleteInput, limit: $limit) {
            socialUserResponseDTO {
              followersCount
              following
              followingCount
              nickName
              profileImagePath
              socialRelationship {
               isFollowed
               isFollowing
              }
              uid
              userRushmoreCount
              userName
            }
            userRushmoreViewComplete {
              urId
              uid
              createdDt
            }
          }
        }
      `,
        variables: {
          userRushmoreViewCompleteInput: {
            urId: userRushmoreViewComplete.urId,
            uid: userRushmoreViewComplete.uid,
            createdDt: userRushmoreViewComplete.createdDt,
          },
          limit,
        },
      });

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      return response.data.data.getUserRushmoreViewCompleteList;
    } catch (error) {
      console.error("Error fetching user rushmore complete list:", error);
      throw error;
    }
  }

  async userRushmoreViewComplete(urId: string): Promise<UserRushmoreDTO> {
    try {
      console.log("userRushmoreViewComplete urId:" + urId);
      const response: AxiosResponse<{
        data: { userRushmoreViewComplete: any };
        errors?: GraphQLError[];
      }> = await api.post(`${BASE_URL}/graphql`, {
        query: `
          mutation {
            userRushmoreViewComplete(
              urId: "${urId}"
            ) {
              userRushmore {
                gameType
                rushmore {
                  rid
                  title
                }
                urId
                version
                visibility
                createdDt
                updatedDt
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

      if (response.data.errors) {
        // Handle GraphQL errors
        let errorMessage = "";

        response.data.errors.forEach((error: GraphQLError) => {
          console.error("GraphQL error:", error.message);
          errorMessage = error.message;
        });

        throw new Error(errorMessage);
      }

      return response.data.data.userRushmoreViewComplete;
    } catch (error) {
      console.error("Error updating userRushmoreViewComplete:", error);
      throw error;
    }
  }

  async likeUserRushmore(urId: string): Promise<UserLike> {
    try {
      console.log("likeUserRushmore urId:" + urId);
      const response: AxiosResponse<{
        data: { likeUserRushmore: UserLike };
        errors?: GraphQLError[];
      }> = await api.post(`${BASE_URL}/graphql`, {
        query: `
          mutation {
            likeUserRushmore(
              urId: "${urId}"
            ) {
              uid
              urId
              createdDt
            }
          }
        `,
      });

      if (response.data.errors) {
        // Handle GraphQL errors
        let errorMessage = "";

        response.data.errors.forEach((error: GraphQLError) => {
          console.error("GraphQL error:", error.message);
          errorMessage = error.message;
        });

        throw new Error(errorMessage);
      }
      console.log(
        "LIKE response:" +
          JSON.stringify(response.data.data.likeUserRushmore, null, 2)
      );
      return response.data.data.likeUserRushmore;
    } catch (error) {
      console.error("Error updating likeUserRushmore:", error);
      throw error;
    }
  }

  async unLikeUserRushmore(urId: string): Promise<UserLike> {
    try {
      console.log("unLikeUserRushmore urId:" + urId);
      const response: AxiosResponse<{
        data: { unLikeUserRushmore: UserLike };
        errors?: GraphQLError[];
      }> = await api.post(`${BASE_URL}/graphql`, {
        query: `
          mutation {
            unLikeUserRushmore(
              urId: "${urId}"
            ) {
              uid
              urId
              createdDt
            }
          }
        `,
      });

      console.log("Done fetching unlike");

      if (response.data.errors) {
        // Handle GraphQL errors
        let errorMessage = "";

        response.data.errors.forEach((error: GraphQLError) => {
          console.error("GraphQL error:", error.message);
          errorMessage = error.message;
        });

        throw new Error(errorMessage);
      }

      console.log(
        "LIKE response:" +
          JSON.stringify(response.data.data.unLikeUserRushmore, null, 2)
      );

      return response.data.data.unLikeUserRushmore;
    } catch (error) {
      console.error("Error updating unLikeUserRushmore:", error);
      throw error;
    }
  }
}

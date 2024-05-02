// UserService.ts
import { ApiFetchEnums } from "../model/ApiFetchEnums";
import { UserRushmore } from "../model/UserRushmore";
import FormData from "form-data";
import api from "./api";
import { AxiosResponse } from "axios";

interface GraphQLError {
  message: string;
  locations: { line: number; column: number }[];
  path: string[];
  extensions: { classification: string };
}

export class UserService<T> {
  private baseURL: string = "http://192.168.0.11:8080"; // Hardcoded base URL

  async getRushmoreItems(uid: string, toFetch: ApiFetchEnums): Promise<T[]> {
    try {
      let data: T[] = [];

      if (toFetch === ApiFetchEnums.FOLLOWERS_LIST) {
        data = require("../sampleApiData/followersList.json");
      } else if (toFetch === ApiFetchEnums.FOLLOWING_LIST) {
        data = require("../sampleApiData/followingList.json");
      } else if (toFetch === ApiFetchEnums.FRIENDS_LIST) {
        data = require("../sampleApiData/friendsList.json");
      } else if (toFetch === ApiFetchEnums.USER_BY_ID) {
        data = require("../sampleApiData/users/user.json");
      } else {
        throw new Error(`Unsupported enum value: ${toFetch}`);
      }

      return data;
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
      throw error; // Re-throw the error for the component to handle
    }
  }

  async getUserRushmoreList(uid: string): Promise<UserRushmore[]> {
    console.log("GetUserRushmoreList UID:" + uid);
    try {
      const response = await api.post(`${this.baseURL}/graphql`, {
        query: `
        query {
          userRushmoresByUid(uid: "${uid}") {
            completedCount
            completedDt
            createdBy
            firstCompletedDt
            firstCompletedUid
            gameType
            firstCompletedUser {
              nickName
              uid
              userName
            }
            urId
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
            highScore
            highScoreUid
            likeCount
            rushmoreType
            userId
          }
        }
        `,
      });

      return response.data.data.userRushmoresByUid;
    } catch (error) {
      console.error("Error fetching user by user ID:", error);
      throw error;
    }
  }

  async getUserByUserId(uid: string): Promise<SocialUser> {
    try {
      const response = await api.post(`${this.baseURL}/graphql`, {
        query: `
        query {
          socialUserByUid(uid: "${uid}") {
            followersCount
            followingCount
            nickName
            profileImagePath
            uid
            userName
            socialRelationship {
              isFollowed
              isFollowing
            }
          }
        }
        `,
      });

      //console.log("OUTPUT:" + JSON.stringify(response.data));
      return response.data.data.socialUserByUid;
    } catch (error) {
      console.error("Error fetching user by user ID:", error);
      throw error;
    }
  }

  async getMyUserProfile(): Promise<SocialUser> {
    console.log("getMyUserProfile");
    try {
      const response = await api.post(`${this.baseURL}/graphql`, {
        query: `
        query {
          getMyUserProfile {
            followersCount
            followingCount
            nickName
            profileImagePath
            uid
            userName
            socialRelationship {
              isFollowed
              isFollowing
            }
          lastUserNameUpdatedDt
          lastNickNameUpdatedDt
          }
        }
        `,
      });

      //console.log("OUTPUT:" + JSON.stringify(response.data));
      return response.data.data.getMyUserProfile;
    } catch (error) {
      console.error("Error fetching user by user ID:", error);
      throw error;
    }
  }

  async userProfileImageUpdate(imageUri: string): Promise<void> {
    try {
      const formData = new FormData();

      // Create a file object from the image URI
      const imageFile = {
        uri: imageUri,
        type: "image/jpeg", // Change the type accordingly based on your image file type
        name: "profile_image.jpg", // Adjust the file name as needed
      };

      // Append the image file to FormData
      formData.append("image", imageFile);

      // Make the HTTP request
      const response = await fetch(`${this.baseURL}/updateUserProfileImage`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //const responseData = await response.json();
      console.log("Response from API:", JSON.stringify(response));
    } catch (error) {
      console.log("Why am I here, what is erroing out");
      throw error; // Re-throw the error for the component to handle
    }
  }

  async getUsersByNickName(searchString: string): Promise<SocialUser[]> {
    try {
      const response = await api.post(`${this.baseURL}/graphql`, {
        query: `
        query {
          getUserByNickName(searchString: "${searchString}") {
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
        }
        `,
      });
      return response.data.data.getUserByNickName;
    } catch (error) {
      console.error("Error fetching users by nickname:", error);
      throw error;
    }
  }

  async getUsersByUserName(searchString: string): Promise<SocialUser[]> {
    try {
      const response = await api.post(`${this.baseURL}/graphql`, {
        query: `
        query {
          getUserByUserName(searchString: "${searchString}") {
            userName,
            uid,
            nickName
          }
        }
        `,
      });
      console.log(
        "resonse from getUsersByusername:" + JSON.stringify(response.data.data)
      );
      return response.data.data.getUserByUserName;
    } catch (error) {
      console.error("Error fetching users by nickname:", error);
      throw error;
    }
  }

  async followUser(followedUid: string): Promise<User> {
    try {
      const response = await api.post(`${this.baseURL}/graphql`, {
        query: `
          mutation {
            followUser(followedUid: "${followedUid}") {
              userName
              nickName
              profileImagePath
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

      return response.data.data.followUser;
    } catch (error) {
      console.error("Error following user:", error);
      throw error;
    }
  }

  async unfollowUser(unfollowedUid: string): Promise<User> {
    try {
      const response = await api.post(`${this.baseURL}/graphql`, {
        query: `
         mutation {
          unFollowUser(unFollowedUid: "${unfollowedUid}") {
            uid
          }
        }
      `,
      });
      return response.data.data.unfollowUser;
    } catch (error) {
      console.error("Error unfollowing user:", error);
      throw error;
    }
  }

  async getFollowersUserList(uid: string): Promise<SocialUser[]> {
    console.log("getFollowersUserList:" + uid);
    try {
      const response = await api.post(`${this.baseURL}/graphql`, {
        query: `
        query {
         getFollowersUserList(uid: "${uid}") {
          followersCount
          followingCount
          nickName
          profileImagePath
          socialRelationship {
            isFollowed
            isFollowing
          }
          uid
          userName
          userRushmoreCount
        }
      }
      `,
      });
      return response.data.data.getFollowersUserList;
    } catch (error) {
      console.error("Error unfollowing user:", error);
      throw error;
    }
  }

  async getFollowingUserList(uid: string): Promise<SocialUser[]> {
    console.log("getFollowinguserList:" + uid);
    try {
      const response = await api.post(`${this.baseURL}/graphql`, {
        query: `
        query {
          getFollowingUserList(uid: "${uid}") {
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
            userName
            userRushmoreCount
        }
      }
      `,
      });

      return response.data.data.getFollowingUserList;
    } catch (error) {
      console.error("Error unfollowing user:", error);
      throw error;
    }
  }

  async getSocialUserByUid(uid: string): Promise<SocialUser> {
    try {
      const response = await api.post(`${this.baseURL}/graphql`, {
        query: `
        query {
          socialUserByUid(uid: "${uid}") {
          followersCount
          followingCount
          nickName
          profileImagePath
          uid
          userName
          socialRelationship
        }
      }
      `,
      });
      return response.data.data.getFollowingUserList;
    } catch (error) {
      console.error("Error unfollowing user:", error);
      throw error;
    }
  }

  async updateUserName(userName: string): Promise<SocialUser> {
    try {
      const response: AxiosResponse<{
        data: { updateUserName: SocialUser };
        errors?: GraphQLError[];
      }> = await api.post(`${this.baseURL}/graphql`, {
        query: `
            mutation {
              updateUserName(userName: "${userName}") {
                uid
                userName
                nickName
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
      return response.data.data.updateUserName;
    } catch (error) {
      // Handle network errors or unexpected errors
      console.error("Error updating user name:", error);
      throw error;
    }
  }

  async updateNickName(nickName: string): Promise<SocialUser> {
    try {
      const response: AxiosResponse<{
        data: { updateUserNickName: SocialUser };
        errors?: GraphQLError[];
      }> = await api.post(`${this.baseURL}/graphql`, {
        query: `
            mutation {
              updateUserNickName(nickName: "${nickName}") {
                uid
                userName
                nickName
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
      return response.data.data.updateUserNickName;
    } catch (error) {
      // Handle network errors or unexpected errors
      console.error("Error updating user name:", error);
      throw error;
    }
  }

  async createUser(): Promise<SocialUser> {
    try {
      const response: AxiosResponse<{
        data: { createUser: SocialUser };
        errors?: GraphQLError[];
      }> = await api.post(`${this.baseURL}/graphql`, {
        query: `
            mutation {
              createUser {
                uid
                userName
                nickName
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
      return response.data.data.createUser;
    } catch (error) {
      // Handle network errors or unexpected errors
      console.error("Error updating user name:", error);
      throw error;
    }
  }
}

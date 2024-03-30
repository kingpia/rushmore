// UserService.ts
import { ApiFetchEnums } from "../model/ApiFetchEnums";
import { UserRushmore } from "../model/UserRushmore";
import axios, { AxiosRequestConfig } from "axios";
import FormData from "form-data";

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

  async getUserRushmoreList(
    uid: string,
    toFetchUid: string,
    toFetch: ApiFetchEnums
  ): Promise<UserRushmore[]> {
    //console.log("getUserByUserId(" + toFetchUid + ")");
    try {
      let data: UserRushmore[] = [];

      data = require("../sampleApiData/userRushmoreList.json");

      return data;
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
      throw error; // Re-throw the error for the component to handle
    }
  }

  async getUserByUserId(uid: string, toFetchUid: string): Promise<SocialUser> {
    try {
      const response = await axios.post(`${this.baseURL}/graphql`, {
        query: `
        query {
          socialUserByUid(uid: "${toFetchUid}") {
            followersCount
            followingCount
            nickName
            profileImagePath
            uid
            userName
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

  async getUsersByNickName(
    uid: string,
    searchString: string
  ): Promise<SocialUser[]> {
    try {
      const response = await axios.post(`${this.baseURL}/graphql`, {
        query: `
        query {
          getUserByNickName(searchString: "${searchString}", uid: "${uid}") {
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

  async followUser(uid: string, followedUid: string): Promise<User> {
    try {
      const response = await axios.post(`${this.baseURL}/graphql`, {
        query: `
          mutation {
            followUser(followedUid: "${followedUid}", uid: "${uid}") {
              userName
              nickName
              profileImagePath
            }
          }
        `,
      });
      return response.data.data.followUser;
    } catch (error) {
      console.error("Error following user:", error);
      throw error;
    }
  }

  async unfollowUser(uid: string, unfollowedUid: string): Promise<User> {
    try {
      const response = await axios.post(`${this.baseURL}/graphql`, {
        query: `
         mutation {
          unFollowUser(uid: "${uid}" unFollowedUid: "${unfollowedUid}") {
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
    try {
      const response = await axios.post(`${this.baseURL}/graphql`, {
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
    try {
      const response = await axios.post(`${this.baseURL}/graphql`, {
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
      const response = await axios.post(`${this.baseURL}/graphql`, {
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
}

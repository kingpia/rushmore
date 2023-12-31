import { ApiFetchEnums } from "../model/ApiFetchEnums";
import { UserRushmore } from "../model/UserRushmore";

export class FriendsService<T> {
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
    console.log("getUserByUserId(" + toFetchUid + ")");
    try {
      let data: UserRushmore[] = [];

      data = require("../sampleApiData/userRushmoreList.json");

      return data;
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
      throw error; // Re-throw the error for the component to handle
    }
  }

  async getUserByUserId(
    uid: string,
    toFetchUid: string,
    toFetch: ApiFetchEnums
  ): Promise<User> {
    console.log("getUserByUserId(" + toFetchUid + ")");
    try {
      let data: User = undefined as unknown as User;

      data = require("../sampleApiData/users/user.json");

      return data;
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
      throw error; // Re-throw the error for the component to handle
    }
  }
}

import { ApiFetchEnums } from "../model/ApiFetchEnums";
import {
  rushmoreListURL,
  yourCompletedRushmoreListURL,
} from "../sampleDataConfig";

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
      } else {
        throw new Error(`Unsupported enum value: ${toFetch}`);
      }

      return data;
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
      throw error; // Re-throw the error for the component to handle
    }
  }
}

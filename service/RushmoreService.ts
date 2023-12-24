import { ApiFetchEnums } from "../model/ApiFetchEnums";
import {
  rushmoreListURL,
  yourCompletedRushmoreListURL,
} from "../sampleDataConfig";

export class RushmoreService<T> {
  async getRushmoreItems(uid: string, toFetch: ApiFetchEnums): Promise<T[]> {
    try {
      let data: T[] = [];

      if (toFetch === ApiFetchEnums.RUSHMORE_LIST) {
        data = require("../sampleApiData/rushmoreList.json");
      } else if (toFetch === ApiFetchEnums.YOUR_COMPLETED_RUSHMORE_LIST) {
        data = require("../sampleApiData/yourCompletedRushmoreList.json");
      } else if (toFetch === ApiFetchEnums.FOLLOWING_RUSHMORE_IN_PROGRESS) {
        data = require("../sampleApiData/followingRushmoreList.json");
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

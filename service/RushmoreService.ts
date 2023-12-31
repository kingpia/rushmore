import { ApiFetchEnums } from "../model/ApiFetchEnums";
import {
  rushmoreListURL,
  yourCompletedRushmoreListURL,
} from "../sampleDataConfig";

export class RushmoreService<T> {
  async getRushmoreItems(uid: string, toFetch: ApiFetchEnums): Promise<T[]> {
    try {
      let data: T[] = [];

      if (toFetch === ApiFetchEnums.YOUR_IN_PROGRESS_RUSHMORE_LIST) {
        data = require("../sampleApiData/yourInProgressRushmoreList.json");
      } else if (toFetch === ApiFetchEnums.YOUR_COMPLETED_RUSHMORE_LIST) {
        data = require("../sampleApiData/yourCompletedRushmoreList.json");
      } else if (
        toFetch === ApiFetchEnums.FOLLOWING_IN_PROGRESS_RUSHMORE_LIST
      ) {
        data = require("../sampleApiData/followingRushmoreInProgressList.json");
      } else if (toFetch === ApiFetchEnums.FOLLOWING_SOLVED_RUSHMORE_LIST) {
        data = require("../sampleApiData/followingRushmoreSolvedList.json");
      } else if (toFetch === ApiFetchEnums.USER_RUSHMORE_LIST) {
        data = require("../sampleApiData/followingRushmoreSolvedList.json");
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

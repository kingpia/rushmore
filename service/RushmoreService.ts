import { ApiFetchEnums } from "../model/ApiFetchEnums";
import { LetterSelectionResponse } from "../model/LetterSelectionResponse";
import { RushmoreGameTypeEnums } from "../model/RushmoreGameTypeEnums";
import { RushmoreType } from "../model/RushmoreTypeEnums";
import { RushmoreVisibilityEnums } from "../model/RushmoreVisibilityEnums";
import { UserRushmore } from "../model/UserRushmore";
import { UserRushmoreGameSession } from "../model/UserRushmoreGameSession";
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
  // New method to simulate delay and return response
  getUserRushmoreGameSession = async (
    urgsid: number,
    uid: string
  ): Promise<UserRushmoreGameSession> => {
    // Simulate a 2-second delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock response
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
        version: 0,
        userRushmoreItemList: [],
      },
      completedDt: new Date(),
      score: 50000,
      letterSelection: "TMX",
      letterSelectionComplete: "N",
    };
  };
}

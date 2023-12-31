import { RushmoreType } from "./RushmoreTypeEnums";

// Interface for Rushmore object
export interface FollowingSolvedRushmore {
  urId: number; // Unique identifier for Rushmore object
  userId: string;
  username: string;
  name: string; //the name of the user
  rushmoreId: string;
  rushmoreTitle: string; //Title of the Rushmore
  type: RushmoreType; // Type of the Rushmore object (enum)
  gameType: string;
  completedDt: Date;
  likeCount: number;
  highScore: number;
  version: number;
  solvedCount: number; //Number of times this rushmore has been completed
  yourScore: number;
  icon: string;
}

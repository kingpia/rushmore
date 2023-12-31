import { RushmoreGameTypeEnums } from "./RushmoreGameTypeEnums";
import { RushmoreType } from "./RushmoreTypeEnums";

// Interface for Rushmore object
export interface UserRushmore {
  urId: number; // userRushmore ID
  rushmoreId: string; // Title of the Rushmore object
  rushmoreTitle: string; //Title of the Rushmore
  type: RushmoreType; // Type of the Rushmore object (enum)
  gameType: RushmoreGameTypeEnums;
  completedDt: Date;
  likeCount: number;
  completedCount: number;
  highScore: number;
  highScoreUsername: string;
  version: number;
  solvedCount: number; //Number of times this rushmore has been completed
  icon: string;
  rushmoreCategory: string;
}

import { RushmoreType } from "./RushmoreTypeEnums";

// Interface for Rushmore object
export interface Rushmore {
  urId: number; // Unique identifier for Rushmore object
  userId: string; // Category of the Rushmore object
  rushmoreId: string; // Title of the Rushmore object
  type: RushmoreType; // Type of the Rushmore object (enum)
  gameType: string;
  completedDt: Date;
  likeCount: number;
  version: number;
  timesCompleted: number; //Number of times this rushmore has been completed
}

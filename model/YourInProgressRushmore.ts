import { RushmoreGameTypeEnums } from "./RushmoreGameTypeEnums";
import { RushmoreType } from "./RushmoreTypeEnums";
import { RushmoreVisibilityEnums } from "./RushmoreVisibilityEnums";

export interface YourInProgressRushmore {
  rushmoreId: string; //Unique id for the rushmore
  rushmoreTitle: string; //Title of the Rushmore
  type: RushmoreType; // Type of the Rushmore object (enum)
  visibility: RushmoreVisibilityEnums;
  gameType: RushmoreGameTypeEnums;
  createdDt: Date;
  completedCount: number; //times completed by other, almost like the popularity
  icon: string;
  rushmoreCategory: string;
}

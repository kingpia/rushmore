import { RushmoreGameTypeEnums } from "./RushmoreGameTypeEnums";
import { RushmoreType } from "./RushmoreTypeEnums";
import { RushmoreVisibilityEnums } from "./RushmoreVisibilityEnums";
import { YourCompletedRushmoreItem } from "./YourCompletedRushmoreItem";

export interface YourCompletedRushmore {
  rushmoreId: string; //Unique id for the rushmore
  rushmoreTitle: string; //Title of the Rushmore
  type: RushmoreType; // Type of the Rushmore object (enum)
  visibility: RushmoreVisibilityEnums;
  gameType: RushmoreGameTypeEnums;
  createdDt: Date;
  likeCount: number; //0 if private
  completedCount: number; //times completed by other, almost like the popularity
  icon: string;
  highScoreUsername: string;
  rushmoreCategory: string;
  yourCompletedRushmoreItems: YourCompletedRushmoreItem[]; //List of items.
}

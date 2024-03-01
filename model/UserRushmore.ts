import { Rushmore } from "./Rushmore";
import { RushmoreGameTypeEnums } from "./RushmoreGameTypeEnums";
import { RushmoreType } from "./RushmoreTypeEnums";
import { RushmoreVisibilityEnums } from "./RushmoreVisibilityEnums";
import { UserRushmoreItem } from "./UserRushmoreItem";

export interface UserRushmore {
  urId: number; //user rushmore id
  user: User; //user who owns the rushmore
  rushmore: Rushmore;
  visibility: RushmoreVisibilityEnums;
  gameType: RushmoreGameTypeEnums;
  rushmoreType: RushmoreType;
  createdDt: string;
  completedDt: string;
  likeCount: number; //0 if private
  completedCount: number; //times completed by other, almost like the popularity
  icon: string;
  highScoreUser: User;
  highScore: number;
  firstToCompleteUser: User;
  firstCompletedDt: Date;
  version: number;
  userRushmoreItemList: UserRushmoreItem[]; //List of items.
}
export { RushmoreVisibilityEnums, RushmoreGameTypeEnums, RushmoreType };

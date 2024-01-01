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
  createdDt: Date;
  completedDt: Date;
  likeCount: number; //0 if private
  completedCount: number; //times completed by other, almost like the popularity
  icon: string;
  highScoreUser: User;
  version: number;
  userRushmoreItemList: UserRushmoreItem[]; //List of items.
}

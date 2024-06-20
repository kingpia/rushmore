import { Rushmore } from "./Rushmore";
import { RushmoreGameTypeEnums } from "./RushmoreGameTypeEnums";
import { RushmoreType } from "./RushmoreTypeEnums";
import { RushmoreVisibilityEnums } from "./RushmoreVisibilityEnums";
import { UserRushmoreItem } from "./UserRushmoreItem";

export interface UserRushmore {
  urId: string; //user rushmore id
  uid: string;
  rushmore: Rushmore;
  ownerUser: SocialUser;
  visibility: RushmoreVisibilityEnums;
  gameType: RushmoreGameTypeEnums;
  rushmoreType: RushmoreType;
  createdDt: string;
  completedDt: string;
  likeCount: number; //0 if private
  bookmarkCount: number;
  completedCount: number; //times completed by other, almost like the popularity
  icon: string;
  highScoreUser: User;
  highScore: number;
  firstCompletedUser: User;
  firstCompletedDt: string;
  version: string;
  displayVersion: string;
  itemList: UserRushmoreItem[]; //List of items.
  itemCount: number;
}
export { RushmoreVisibilityEnums, RushmoreGameTypeEnums, RushmoreType };

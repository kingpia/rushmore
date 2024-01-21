import { UserRushmore } from "./UserRushmore";
import { UserRushmoreGameSessionItem } from "./UserRushmoreGameSessionItem";

export interface UserRushmoreGameSession {
  createdDt: Date;
  urgsId: number; //session id
  user: User; //The user who's game this is.
  userRushmore: UserRushmore; //the user rushmore being solved.
  completedDt: Date; //null if incomplete
  score: number;
  letterSelection: string;
  letterSelectionComplete: string;
  userRushmoreGameSessionItemList: UserRushmoreGameSessionItem[];
}

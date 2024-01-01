import { UserRushmore } from "./UserRushmore";

export interface UserRushmoreGameSession {
  urgsId: number; //session id
  user: User; //The user who's game this is.
  userRushmore: UserRushmore; //the user rushmore being solved.
  completedDt: Date; //null if incomplete
  score: number;
  letterSelection: string;
  letterSelectionComplete: string;
}

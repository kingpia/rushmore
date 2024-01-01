import { RushmoreType } from "./RushmoreTypeEnums";
import { UserRushmore } from "./UserRushmore";
import { UserRushmoreGameSession } from "./UserRushmoreGameSession";

/* A Users Solved Rushmore*/
export interface NewFollowingSolvedRushmore {
  solvedUserRushmore: UserRushmore; //the solved user rushmore
  userRushmoreGameSession: UserRushmoreGameSession; //the game session of the solver
}

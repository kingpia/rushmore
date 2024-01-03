import { RushmoreType } from "./RushmoreTypeEnums";
import { UserRushmore } from "./UserRushmore";
import { UserRushmoreGameSession } from "./UserRushmoreGameSession";

/* A users Solved Rushmore*/
export interface SolvedUserRushmore {
  solvedUserRushmore: UserRushmore; //the solved user rushmore
  userRushmoreGameSession: UserRushmoreGameSession; //the game session of the user who solved
}

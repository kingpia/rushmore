import { UserRushmore } from "./UserRushmore";
import { UserRushmoreGameSession } from "./UserRushmoreGameSession";

export interface UserRushmoreDTO {
  userRushmore: UserRushmore;
  userRushmoreGameSession: UserRushmoreGameSession;
  liked: boolean;
}

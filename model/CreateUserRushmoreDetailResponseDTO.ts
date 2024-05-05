import { Rushmore } from "./Rushmore";
import { RushmoreCategory } from "./RushmoreCategory";
import { UserRushmore } from "./UserRushmore";

export interface CreateUserRushmoreDetailResponseDTO {
  userRushmoreList: UserRushmore[];
  rushmoreList: Rushmore[];
  rushmoreCategoryList: RushmoreCategory[];
}

import { Rushmore } from "./Rushmore";
import { RushmoreCategory } from "./RushmoreCategory";
import {
  RushmoreGameTypeEnums,
  RushmoreType,
  RushmoreVisibilityEnums,
} from "./UserRushmore";

export interface CreateUserRushmoreRequestDTO {
  rid: string | undefined;
  visibility: RushmoreVisibilityEnums;
  gameType: RushmoreGameTypeEnums;
}

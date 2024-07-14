import {
  RushmoreGameTypeEnums,
  RushmoreType,
  RushmoreVisibilityEnums,
} from "./UserRushmore";

export interface CreateUserRushmoreRequestDTO {
  rid: string | undefined;
  visibility: RushmoreVisibilityEnums;
  gameType: RushmoreGameTypeEnums;
  type: RushmoreType;
}

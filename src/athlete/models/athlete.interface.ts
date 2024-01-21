import { Gender } from "src/shared/enums/Gender.enum";

export interface Athlete {
  id?: string;
  name: string;
  matchesPlayed?: number;
  matchesWon?: number;
  groupId?: string;
  gender?: Gender;
}

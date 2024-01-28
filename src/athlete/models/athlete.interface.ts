import { Match } from "src/match/models/match.interface";
import { Gender } from "src/shared/enums/Gender.enum";
import { Tournament } from "src/tournament/models/tournament.interface";

export interface Athlete {
  id: string;
  name: string;
  matchesPlayed?: number;
  matchesWon?: number;
  groupId?: string;
  gender?: Gender;
  tournaments?: Tournament[];
  matchesAsWinner?: Match[];
  matchesAsAthlete2?: Match[];
  matchesAsAthlete1?:Match[];
}

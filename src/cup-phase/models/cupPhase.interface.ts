import { Match } from "src/match/models/match.interface";
import { PhaseName } from "src/shared/enums/PhaseName.enum";
import { Tournament } from "src/tournament/models/tournament.interface";

export interface cupPhase {
  id: string;
  phaseName: PhaseName;
  matches: Match[];
  tournament: Tournament;
}
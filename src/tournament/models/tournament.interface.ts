import { Athlete } from "src/athlete/models/athlete.interface";
import { cupPhase } from "src/cup-phase/models/cupPhase.interface";
import { Group } from "src/group/models/group.interface";
import { TournamentManager } from "src/tournament-manager/models/tournamentManager.interface";

export interface Tournament {
  id: string;
  name: string;
  athletes?: Athlete[];
  phases?: cupPhase[];
  tournamentManager: TournamentManager;
  group?: Group;
}
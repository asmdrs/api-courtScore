import { Tournament } from "src/tournament/models/tournament.interface";

export interface TournamentManager{
  id?: string;
  name: string;
  managedTournaments: Tournament;
}
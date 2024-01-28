import { Athlete } from "src/athlete/models/athlete.interface";
import { cupPhase } from "src/cup-phase/models/cupPhase.interface";

export interface Match{
  id: string;
  athlete1: Athlete;
  athlete2: Athlete;
  player1Score?: number[];
  player2Score?: number[];
  winner?: Athlete;
  date: Date;
  phase?: cupPhase;
}
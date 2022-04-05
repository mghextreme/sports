import { ITeam } from "./team.interface";

export interface IRoundRobinRow {
  team: ITeam;
  matchesPlayed: number;
  points: number;
  wins: number;
  ties: number;
  losses: number;
  scorePro: number;
  scoreAgainst: number;
}

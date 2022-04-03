import { ISingleBracketMatch } from "./single-bracket-match.interface";

export interface ISingleBracketRound {
  round: number;
  matches: ISingleBracketMatch[];
}

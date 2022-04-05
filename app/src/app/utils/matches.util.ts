import { IMatch, ISingleBracketMatch } from "../models";

export class MatchesUtils {

  public static toSingleBracketMatches(matches: IMatch[]): ISingleBracketMatch[] {
    return matches.map(match => MatchesUtils.toSingleBracketMatch(match, 1));
  }

  public static toSingleBracketMatch(match: IMatch, round: number): ISingleBracketMatch {
    return {
      id: match.id,
      started: match.started,
      finished: match.finished,
      name: match.name,
      teams: match.teams,
      round
    };
  }

}

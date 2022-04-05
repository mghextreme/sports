import { IMatch, ISingleBracketMatch } from "../models";

export class MatchesUtils {

  public static toSingleBracketMatches(matches: IMatch[]): ISingleBracketMatch[] {
    if (!matches || matches.length == 0) {
      return [];
    }

    let totalRounds = Math.ceil(Math.log2(matches.length));
    return matches.map((match, index, array) => {
      let remainingMatches = array.length - index;
      let log2 = Math.floor(Math.log2(remainingMatches));
      let round = totalRounds - log2;
      return MatchesUtils.toSingleBracketMatch(match, round);
    });
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

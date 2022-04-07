import { MatchFeedType } from "./match-feed-type.enum";

export interface IMatchFeedItem {
  id: number;
  timestamp: Date;
  matchTime: number;
  type: MatchFeedType;
  teamId: number;
  teamParticipantId: number;
}

import { ViewEntity, ViewColumn, Connection, ManyToOne } from "typeorm";
import { MatchTeam } from "./match-team.entity";
import { Match } from "./match.entity";
import { Stage } from "./stage.entity";
import { Team } from "./team.entity";

@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
    .select("MT.teamId", "teamId")
    .addSelect("S.id", "stageId")
    .addSelect("SUM(CASE WHEN M.finished = true THEN 1 ELSE 0 END)", "matchesPlayed")
    .addSelect("0", "points")
    .addSelect("0", "wins")
    .addSelect("0", "ties")
    .addSelect("0", "losses")
    .addSelect("SUM(CASE WHEN M.finished = true THEN MT.score ELSE 0 END)", "scorePro")
    .addSelect("0", "scoreAgainst")
    .from("stage_teams", "ST")
    .leftJoin(Stage, "S", "ST.stagesId = S.id")
    .leftJoin(Match, "M", "M.stageId = S.id")
    .leftJoin(MatchTeam, "MT", "MT.matchId = M.id")
    .groupBy("S.id")
    .addGroupBy("MT.teamId")
    .where("S.mode = 'round'")
})
export class RoundRobinRow {

  @ViewColumn()
  matchesPlayed: number;

  @ViewColumn()
  points: number;

  @ViewColumn()
  wins: number;

  @ViewColumn()
  ties: number;

  @ViewColumn()
  losses: number;

  @ViewColumn()
  scorePro: number;

  @ViewColumn()
  scoreAgainst: number;

  @ViewColumn()
  teamId: number;

  @ManyToOne(() => Team)
  team: Team;

  @ViewColumn()
  stageId: number;

  @ManyToOne(() => Stage)
  stage: Stage;

}
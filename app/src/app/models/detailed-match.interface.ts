import { IMatch } from "./match.interface";
import { IModality } from "./modality.interface";
import { IStage } from "./stage.interface";

export interface IDetailedMatch extends IMatch {
  stage: IStage;
  modality: IModality;
  dateTimeScheduled?: Date;
  dateTimeStarted?: Date;
  dateTimeFinished?: Date;
}

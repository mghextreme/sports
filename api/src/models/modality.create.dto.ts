import { Modality } from "src/entities";
import { ICreateDto } from "./create.dto.interface";

export class ModalityCreateDto implements ICreateDto<Modality> {
  name: string;
  sportId: number;
  eventId: number;
  finished?: boolean;
  maxTeamSize?: number;
  maxTeamsPerGroup?: number;
}

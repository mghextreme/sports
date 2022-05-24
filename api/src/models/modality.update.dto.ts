import { Modality } from "src/entities";
import { ModalityCreateDto } from "./modality.create.dto";
import { IUpdateDto } from "./update.dto.interface";

export class ModalityUpdateDto extends ModalityCreateDto implements IUpdateDto<Modality> {
  id: number;
}

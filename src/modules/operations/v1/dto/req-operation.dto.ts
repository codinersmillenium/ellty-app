import { OmitType } from '@nestjs/swagger';
import { OperationDataDto } from './operation-data.dto';

export class ReqOperationDto extends OmitType(OperationDataDto, ['author_id', 'result'] as const) {}
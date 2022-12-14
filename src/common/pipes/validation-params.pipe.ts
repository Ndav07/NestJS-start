import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common'

export class ValidationParams implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(
        `The ${metadata.data} paramenter must be informed`
      )
    }

    return value
  }
}

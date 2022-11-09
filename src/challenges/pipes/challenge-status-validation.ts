import { PipeTransform, BadRequestException } from '@nestjs/common'
import { ChallengeStatus } from '../interfaces/challenge-status.enum'

interface IRequest {
  challengeDateTime: string
  status: string
}

export class ChallengeStatusValidationPipe implements PipeTransform {
  transform(req: IRequest) {
    const status = req.status.toUpperCase()

    if (this.itsStatusValid(status) === false) {
      throw new BadRequestException('Status invalid')
    }

    return req
  }

  private itsStatusValid(status: string): boolean {
    const idx = Object.keys(ChallengeStatus).indexOf(status)
    if (idx === -1) {
      return false
    } else if (idx === 0) {
      return false
    } else if (idx === 1) {
      return false
    } else {
      return true
    }
  }
}

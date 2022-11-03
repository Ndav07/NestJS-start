import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreatePlayerDTO {
  @IsEmail()
  readonly email: string
  @IsNotEmpty()
  readonly phoneNumber: string
  @IsNotEmpty()
  readonly name: string
}

import { IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    public username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)

    // 정규표현식
    @Matches(/^[a-zA-Z0-9]*$/, { message: 'password only accepts english and number'
    })
    password: string;
}
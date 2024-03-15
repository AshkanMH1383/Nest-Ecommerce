import { UserGroup } from 'src/database/entities/user-group.entity';

export class CreateUserDto {
  userGroup: UserGroup;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  image: string;
  status: boolean;
}

import { DataSource } from "typeorm";
import { Auth, User } from "./users.entity";

export const usersProviders = [
    {
      provide: 'USERS_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'AUTH_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Auth),
      inject: ['DATA_SOURCE'],
    },
  ];
  
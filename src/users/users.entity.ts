import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, Unique } from "typeorm";

@Entity()
export class User extends BaseEntity {
  constructor(nickname: string, image: string) {
    super();
    this.nickname = nickname;
    this.image = image;
  }

  //TODO: 42API 제공 id를 사용하기 때문에 PrimaryColumn()으로
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  nickname: string;

  @Column({ nullable: true })
  image: string;

}

@Entity()
export class Auth extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  authenticated: boolean;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
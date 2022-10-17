import { WeblogInterface } from 'src/common/interfaces/weblog.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exp.tblUser')
export class UserEntity implements WeblogInterface {

  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column({
    unique: true
  })
  Username: string;

  @Column({
    unique: true
  })
  Email: string;

  @Column()
  Password: string;

  @Column()
  Fullname: string;

  @Column()
  IsPremium: boolean;

  @Column()
  Active: boolean;

  @Column()
  CreatedAt: Date;

  @Column()
  CreatedBy: string;

  @Column()
  UpdatedAt: Date;
  
  @Column()
  UpdatedBy: string;
}

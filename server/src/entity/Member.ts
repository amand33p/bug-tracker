import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from './Project';
import { User } from './User';

@Entity({ name: 'members' })
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project)
  @JoinColumn({ name: 'projectId' })
  project: Project;
  @Column()
  projectId: string;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'memberId' })
  member: User;
  @Column()
  memberId: string;
}

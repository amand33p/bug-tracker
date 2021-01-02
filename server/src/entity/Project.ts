import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import BaseModel from './BaseModel';
import { User } from './User';
import { Member } from './Member';
import { Bug } from './Bug';

@Entity({ name: 'projects' })
export class Project extends BaseModel {
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;
  @Column()
  createdById: string;

  @OneToMany(() => Member, (member) => member.memberId)
  @JoinColumn()
  members: Member[];

  @OneToMany(() => Bug, (bugs) => bugs.projectId)
  @JoinColumn()
  bugs: Bug[];
}

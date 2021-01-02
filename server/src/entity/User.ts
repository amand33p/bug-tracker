import { Entity, Column, ManyToMany } from 'typeorm';
import BaseModel from './BaseModel';
import { Project } from './Project';

@Entity({ name: 'users' })
export class User extends BaseModel {
  @Column({ type: 'varchar', length: 20 })
  username: string;

  @Column()
  passwordHash: string;

  @ManyToMany(() => Project, (project) => project.members)
  joinedProjects: Project[];
}

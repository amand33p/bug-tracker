import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import BaseModel from './BaseModel';
import { Project } from './Project';
import { User } from './User';
import { Note } from './Note';

type Priority = 'low' | 'medium' | 'high';

@Entity({ name: 'bugs' })
export class Bug extends BaseModel {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ['low', 'medium', 'high'],
    default: 'low',
  })
  priority: Priority;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;
  @Column()
  createdById: string;

  @ManyToOne(() => Project, (project) => project)
  @JoinColumn({ name: 'projectId' })
  @Column()
  projectId: string;

  @Column({ default: false })
  isResolved: boolean;

  @Column({ nullable: true })
  closedAt: Date;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'closedById' })
  closedBy: User;
  @Column({ nullable: true })
  closedById: string;

  @OneToMany(() => Note, (note) => note.bugId)
  @JoinColumn()
  notes: Note[];
}

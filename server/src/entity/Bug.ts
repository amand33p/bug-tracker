import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Project } from './Project';
import { User } from './User';
import { Note } from './Note';

type Priority = 'low' | 'medium' | 'high';

@Entity({ name: 'bugs' })
export class Bug extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ['low', 'medium', 'high'],
    default: 'low',
  })
  priority: Priority;

  @ManyToOne(() => Project, (project) => project)
  @JoinColumn({ name: 'projectId' })
  project: Project;
  @Column()
  projectId: string;

  @OneToMany(() => Note, (note) => note.bug)
  @JoinColumn()
  notes: Note[];

  @Column({ default: false })
  isResolved: boolean;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'closedById' })
  closedBy: User;
  @Column({ nullable: true })
  closedById: string;

  @Column({ nullable: true })
  closedAt: Date;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;
  @Column()
  createdById: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'closedById' })
  updatedBy: User;
  @Column({ nullable: true })
  updatedById: string;

  @Column({ nullable: true })
  updatedAt: Date;
}

import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Bug } from './Bug';
import { User } from './User';

@Entity({ name: 'notes' })
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Bug, (bug) => bug)
  @JoinColumn({ name: 'bugId' })
  bug: Bug;
  @Column()
  bugId: string;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'authorId' })
  author: User;
  @Column()
  authorId: string;
}

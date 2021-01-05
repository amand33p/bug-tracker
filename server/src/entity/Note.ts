import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'authorId' })
  author: User;
  @Column()
  authorId: string;

  @ManyToOne(() => Bug, (bug) => bug)
  @JoinColumn({ name: 'bugId' })
  bug: Bug;
  @Column()
  bugId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

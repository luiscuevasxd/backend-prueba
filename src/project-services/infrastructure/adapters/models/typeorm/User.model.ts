import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({
  name: 'user'
})
export class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Index()
  @Column('character', {
    length: 200
  })
  username: string = '';

  @Index()
  @Column('character', {
    length: 250
  })
  email: string = '';

  @Column('character', {
    length: 200
  })
  password: string = '';

  @Index()
  @Column('int')
  status: number = 1;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  updatedAt?: Date;
}

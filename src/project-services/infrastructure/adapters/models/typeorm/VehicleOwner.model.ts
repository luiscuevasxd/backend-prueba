import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from './User.model';
import { Vehicle } from './Vehicle.model';

@Entity({
  name: 'vehicleOwner'
})
export class VehicleOwner {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Index()
  @Column('character', {
    length: 200
  })
  name: string = '';

  @Index()
  @Column('character', {
    length: 200
  })
  lastname: string = '';

  @Column('int')
  age?: number;

  @Index()
  @Column('int')
  userId: number = 0;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User = {} as User;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.vehicleOwnerId)
  vehicles?: Vehicle[];

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

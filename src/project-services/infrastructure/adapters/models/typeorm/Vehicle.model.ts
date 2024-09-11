import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { TypeOperationVehicle } from './TypeOperationVehicle.model';
import { User } from './User.model';
import { VehicleOwner } from './VehicleOwner.model';

@Entity({
  name: 'vehicle'
})
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Index()
  @Column('character', {
    length: 50
  })
  brand: string = '';

  @Index()
  @Column('character', {
    length: 50
  })
  model: string = '';

  @Column('int')
  price: number = 0;

  @Index()
  @Column('int')
  userId: number = 0;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User = {} as User;

  @Index()
  @Column('int')
  typeOperationVehicleId: number = 0;

  @ManyToOne(() => TypeOperationVehicle)
  @JoinColumn({ name: 'typeOperationVehicleId' })
  typeOperationVehicle: TypeOperationVehicle = {} as TypeOperationVehicle;

  @Index()
  @Column('int')
  vehicleOwnerId: number = 0;

  @ManyToOne(() => VehicleOwner)
  @JoinColumn({ name: 'vehicleOwnerId' })
  vehicleOwner: VehicleOwner = {} as VehicleOwner;

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

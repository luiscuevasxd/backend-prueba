import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Vehicle } from './Vehicle.model';

@Entity({
  name: 'typeOperationVehicle'
})
export class TypeOperationVehicle {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column('character', {
    length: 200
  })
  name: string = '';

  @Column('character', {
    length: 200
  })
  code: string = '';

  @Column('character', {
    length: 200
  })
  description: string = '';

  @OneToMany(() => Vehicle, (vehicle) => vehicle.typeOperationVehicleId)
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

import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TrimSubscriber } from './Subscriber';
import { TypeOperationVehicle } from './TypeOperationVehicle.model';
import { User } from './User.model';
import { Vehicle } from './Vehicle.model';
import { VehicleOwner } from './VehicleOwner.model';

const props: DataSourceOptions = {
  type: 'postgres',
  synchronize: false,
  logging: false,
  entities: [TypeOperationVehicle, User, Vehicle, VehicleOwner],
  ssl: false,

  migrations: [],
  subscribers: [],
  replication: {
    master: {
      host: process.env.DB_WRITE_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    slaves: [
      {
        host: process.env.DB_READ_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      }
    ]
  }
};

export const modelDB = new DataSource(props);

export const connectPostgres = async () => {
  if (!process.env.TEST && !modelDB.isInitialized) {
    await modelDB.initialize();

    modelDB.subscribers.push(new TrimSubscriber());
  }
};

export { TypeOperationVehicle, User, Vehicle, VehicleOwner };

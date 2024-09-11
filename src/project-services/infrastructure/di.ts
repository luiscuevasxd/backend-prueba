import {
  TypeOperationVehicleService,
  UserService,
  VehicleOwnerService,
  VehicleService
} from '../core/services';
import {
  modelDB,
  TypeOperationVehicleController,
  TypeOperationVehicleRepository,
  UserController,
  UserRepository,
  VehicleController,
  VehicleOwnerController,
  VehicleOwnerRepository,
  VehicleRepository
} from './adapters';
import { envVariableValidator } from './utils';

const envVariables = {
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '',
  DB_WRITE_HOST: process.env.DB_WRITE_HOST ?? '',
  DB_READ_HOST: process.env.DB_READ_HOST ?? '',
  DB_PORT: process.env.DB_PORT ?? '',
  DB_USER: process.env.DB_USER ?? '',
  DB_PASSWORD: process.env.DB_PASSWORD ?? '',
  DB_NAME: process.env.DB_NAME ?? ''
};

envVariableValidator(envVariables);

// Repositories
const userRepository = new UserRepository(modelDB);
const vehicleOwnerRepository = new VehicleOwnerRepository(modelDB);
const vehicleRepository = new VehicleRepository(modelDB);
const typeOperationVehicleRepository = new TypeOperationVehicleRepository(modelDB);

// Services
const userService = new UserService(userRepository);
const vehicleOwnerService = new VehicleOwnerService(vehicleOwnerRepository);
const vehicleService = new VehicleService(vehicleRepository);
const typeOperationVehicleService = new TypeOperationVehicleService(typeOperationVehicleRepository);

// Controllers
export const userController = new UserController(userService);
export const vehicleOwnerController = new VehicleOwnerController(vehicleOwnerService);
export const vehicleController = new VehicleController(vehicleService);
export const typeOperationVehicleController = new TypeOperationVehicleController(
  typeOperationVehicleService
);

import { modelDB, User } from '../typeorm';
import { typeOperationVehicles } from './typeOperationVehicles';
import { users } from './users';

async function checkIfTableExists(tableName: string): Promise<boolean> {
  try {
    const query = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = $1
      );
    `;

    const result = await modelDB.getRepository(User).query(query, [tableName]);
    return result[0].exists;
  } catch (error) {
    return false;
  }
}

export async function seed() {
  const response = await checkIfTableExists('user');

  if (!response) await modelDB.synchronize();

  await users();
  await typeOperationVehicles();
}

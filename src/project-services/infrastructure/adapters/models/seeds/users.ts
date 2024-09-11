import * as bcrypt from 'bcrypt';
import { modelDB, User } from '../typeorm';

export async function users() {
  try {
    const userRepository = modelDB.getRepository(User);

    const existingUser = await userRepository.findOne({ where: { username: 'admin' } });

    if (existingUser) return;

    const user = new User();
    user.email = 'admin@example.com';
    user.password = await bcrypt.hash('admin', 10);
    user.username = 'admin';

    await userRepository.save(user);
  } catch (error) {
    console.error('Error durante el seeding user:', error);
  }
}

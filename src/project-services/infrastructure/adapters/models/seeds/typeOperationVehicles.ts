import { In } from 'typeorm';
import { modelDB, TypeOperationVehicle } from '../typeorm';

const data = [
  {
    name: 'En venta',
    code: 'for_sale',
    description: 'Vehículos disponibles para la venta'
  },
  {
    name: 'En alquiler',
    code: 'rent',
    description: 'Vehículos disponibles para alquilar'
  },
  {
    name: 'Vendido',
    code: 'sold',
    description: 'Vehículos que han sido vendidos'
  },
  {
    name: 'Alquilado',
    code: 'rented',
    description: 'Vehículos que han sido alquilados'
  }
];

export async function typeOperationVehicles() {
  try {
    const typeOperationVehicleRepository = modelDB.getRepository(TypeOperationVehicle);

    const existingTypeOperationVehicles = await typeOperationVehicleRepository.find({
      where: { code: In(data.map((d) => d.code)) }
    });

    await Promise.all(
      data.map((d) => {
        const exists = existingTypeOperationVehicles.some((t) => t.code === d.code);

        if (exists) return;

        const typeOperationVehicle = new TypeOperationVehicle();
        typeOperationVehicle.name = d.name;
        typeOperationVehicle.code = d.code;
        typeOperationVehicle.description = d.description;

        return typeOperationVehicleRepository.save(typeOperationVehicle);
      })
    );
  } catch (error) {
    console.error('Error durante el seeding type operation vehicle:', error);
  }
}

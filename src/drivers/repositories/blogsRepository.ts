import { Blogs } from '../types/blogs';
import { db } from '../../db/in-memory.db';
import { DriverInputDto } from '../dto/driver.input-dto';

export const blogsRepository = {
  findAll(): Blogs[] {
    return db.blogs;
  },

  findById(id: number): Blogs | null {
    return db.blogs.find((d) => d.id === id) ?? null; // Если результат поиска равно null или undefined, то вернем null.
  },

  create(newDriver: Blogs): Blogs {
    db.blogs.push(newDriver);

    return newDriver;
  },

  update(id: number, dto: DriverInputDto): void {
    const blogs = db.blogs.find((d) => d.id === id);

    if (!blogs) {
      throw new Error('Blogs not exist');
    }

    blogs.name = dto.name;
    blogs.phoneNumber = dto.phoneNumber;
    blogs.email = dto.email;
    blogs.vehicleMake = dto.vehicleMake;
    blogs.vehicleModel = dto.vehicleModel;
    blogs.vehicleYear = dto.vehicleYear;
    blogs.vehicleLicensePlate = dto.vehicleLicensePlate;
    blogs.vehicleDescription = dto.vehicleDescription;
    blogs.vehicleFeatures = dto.vehicleFeatures;

    return;
  },

  delete(id: number): void {
    const index = db.blogs.findIndex((v) => v.id === id);

    if (index === -1) {
      throw new Error('Blogs not exist');
    }

    db.blogs.splice(index, 1);
    return;
  },
};

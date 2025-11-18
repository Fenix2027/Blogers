import { Request, Response } from 'express';
import { DriverInputDto } from '../../dto/driver.input-dto';
import { HttpStatus } from '../../../core/types/http-statuses';
import { db } from '../../../db/in-memory.db';
import { Blogs } from '../../types/blogs';
import { blogsRepository } from '../../repositories/blogsRepository';

export function createDriverHandler(
  req: Request<{}, {}, DriverInputDto>,
  res: Response,
) {
  const newDriver: Blogs = {
    id: db.blogs.length ? db.blogs[db.blogs.length - 1].id + 1 : 1,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    vehicleMake: req.body.vehicleMake,
    vehicleModel: req.body.vehicleModel,
    vehicleYear: req.body.vehicleYear,
    vehicleLicensePlate: req.body.vehicleLicensePlate,
    vehicleDescription: req.body.vehicleDescription,
    vehicleFeatures: req.body.vehicleFeatures,
    createdAt: new Date(),
  };

  blogsRepository.create(newDriver);
  res.status(HttpStatus.Created).send(newDriver);
}

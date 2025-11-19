import request from 'supertest';
import { BlogsInputDto } from '../../../src/blogs/dto/blogs-input.dto';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { Blogs } from '../../../src/blogs/types/blogs';
import { BLOGS_PATH } from '../../../src/core/paths/paths';
import { getDriverDto } from './get-driver-dto';

export async function createDriver(
  app: Express,
  driverDto?: BlogsInputDto,
): Promise<Blogs> {
  const defaultDriverData: BlogsInputDto = getDriverDto();

  const testDriverData = { ...defaultDriverData, ...driverDto };

  const createdDriverResponse = await request(app)
    .post(BLOGS_PATH)
    .set('Authorization', generateBasicAuthToken())
    .send(testDriverData)
    .expect(HttpStatus.Created);

  return createdDriverResponse.body;
}

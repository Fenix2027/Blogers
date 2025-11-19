import request from 'supertest';
import { Express } from 'express';
import { BlogsInputDto } from '../../../src/blogs/dto/blogs-input.dto';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { getDriverDto } from './get-driver-dto';
import { BLOGS_PATH } from '../../../src/core/paths/paths';
import { generateBasicAuthToken } from '../generate-admin-auth-token';

export async function updateBlog(
  app: e.Express,
  driverId: string,
  driverDto?: BlogsInputDto,
): Promise<void> {
  const defaultDriverData: BlogsInputDto = getDriverDto();

  const testDriverData = { ...defaultDriverData, ...driverDto };

  const updatedDriverResponse = await request(app)
    .put(`${BLOGS_PATH}/${driverId}`)
    .set('Authorization', generateBasicAuthToken())
    .send(testDriverData)
    .expect(HttpStatus.NoContent);

  return updatedDriverResponse.body;
}

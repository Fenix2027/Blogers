import request from 'supertest';
import { BlogsAttributes } from '../../../src/blogs/application/dtos/blogs.attributes';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { getDriverDto } from './get-driver-dto';
import { BLOGS_PATH } from '../../../src/core/paths/paths';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import e = require('express');

export async function updateBlog(
  app: e.Express,
  driverId: string,
  driverDto?: BlogsAttributes,
): Promise<void> {
  const defaultDriverData: BlogsAttributes = getDriverDto();

  const testDriverData = { ...defaultDriverData, ...driverDto };

  const updatedDriverResponse = await request(app)
    .put(`${BLOGS_PATH}/${driverId}`)
    .set('Authorization', generateBasicAuthToken())
    .send(testDriverData)
    .expect(HttpStatus.NoContent);

  return updatedDriverResponse.body;
}

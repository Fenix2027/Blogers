import request from 'supertest';
import { BlogsAttributes } from '../../../src/blogs/application/dtos/blogs.attributes';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { Blog } from '../../../src/blogs/domain/blog';
import { BLOGS_PATH } from '../../../src/core/paths/paths';
import { getDriverDto } from './get-driver-dto';

export async function createBlog(
  app: Express,
  driverDto?: BlogsAttributes,
): Promise<Blog> {
  const defaultDriverData: BlogsAttributes = getDriverDto();

  const testDriverData = { ...defaultDriverData, ...driverDto };

  const createdDriverResponse = await request(app)
    .post(BLOGS_PATH)
    .set('Authorization', generateBasicAuthToken())
    .send(testDriverData)
    .expect(HttpStatus.Created);

  return createdDriverResponse.body;
}

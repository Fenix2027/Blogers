import request from 'supertest';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { BLOGS_PATH } from '../../../src/core/paths/paths';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { Blog } from '../../../src/blogs/types/blog';
import e = require('express');

export async function getBlogById(
  app: e.Express,
  driverId: string,
): Promise<Blog> {
  const driverResponse = await request(app)
    .get(`${BLOGS_PATH}/${driverId}`)
    .set('Authorization', generateBasicAuthToken())
    .expect(HttpStatus.Ok);

  return driverResponse.body;
}

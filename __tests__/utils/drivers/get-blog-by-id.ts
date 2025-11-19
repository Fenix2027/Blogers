import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { BLOGS_PATH } from '../../../src/core/paths/paths';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { Blogs } from '../../../src/blogs/types/blogs';

export async function getBlogById(app: e.Express, driverId: string): Promise<Blogs> {
  const driverResponse = await request(app)
    .get(`${BLOGS_PATH}/${driverId}`)
    .set('Authorization', generateBasicAuthToken())
    .expect(HttpStatus.Ok);

  return driverResponse.body;
}

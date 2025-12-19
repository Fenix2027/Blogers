// @ts-ignore
import request from 'supertest';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { Express } from 'express';
import { PostAttributes } from '../../../src/posts/application/dtos/post-attributes';
import { createBlog } from '../drivers/create-blog';
import { Post } from '../../../src/posts/domain/post';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { POSTS_PATH } from '../../../src/core/paths/paths';
import { getRideDto } from './get-ride-dto';

export async function createRide(
  app: Express,
  rideDto?: PostAttributes,
): Promise<Post> {
  const driver = await createBlog(app);

  const defaultRideData = getRideDto(driver.id);

  const testRideData = { ...defaultRideData, ...rideDto };

  const createdRideResponse = await request(app)
    .post(POSTS_PATH)
    .set('Authorization', generateBasicAuthToken())
    .send(testRideData)
    .expect(HttpStatus.Created);

  return createdRideResponse.body;
}

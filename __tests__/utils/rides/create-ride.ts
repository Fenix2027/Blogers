// @ts-ignore
import request from 'supertest';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { Express } from 'express';
import { PostInputDto } from '../../../src/posts/dto/post-input.dto';
import { createBlog } from '../drivers/create-blog';
import { Post } from '../../../src/posts/types/post';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { POSTS_PATH } from '../../../src/core/paths/paths';
import { getRideDto } from './get-ride-dto';

export async function createRide(
  app: Express,
  rideDto?: PostInputDto,
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

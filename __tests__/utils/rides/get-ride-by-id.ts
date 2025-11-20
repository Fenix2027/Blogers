// @ts-ignore
import request from 'supertest';
import { Post } from '../../../src/posts/types/post';
import e from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { POSTS_PATH } from '../../../src/core/paths/paths';
import { generateBasicAuthToken } from '../generate-admin-auth-token';

export async function getRideById(
  app: e.Express,
  rideId: string,
): Promise<Post> {
  const getResponse = await request(app)
    .get(`${POSTS_PATH}/${rideId}`)
    .set('Authorization', generateBasicAuthToken())
    .expect(HttpStatus.Ok);

  return getResponse.body;
}

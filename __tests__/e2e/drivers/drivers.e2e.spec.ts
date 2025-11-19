import request from 'supertest';
import express from 'express';
import { setupApp } from '../../../src/setup-app';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { BlogsInputDto } from '../../../src/blogs/dto/blogs-input.dto';
import { BLOGS_PATH } from '../../../src/core/paths/paths';
import { getDriverDto } from '../../utils/drivers/get-driver-dto';
import { generateBasicAuthToken } from '../../utils/generate-admin-auth-token';
import { createBlog } from '../../utils/drivers/create-blog';
import { clearDb } from '../../utils/clear-db';
import { getBlogById } from '../../utils/drivers/get-blog-by-id';
import { updateBlog } from '../../utils/drivers/update-blog';

describe('Driver API', () => {
  const app = express();
  setupApp(app);

  const adminToken = generateBasicAuthToken();

  beforeAll(async () => {
    await clearDb(app);
  });

  it('✅ should create driver; POST /api/blogs', async () => {
    const newBlog: BlogsInputDto = {
      ...getDriverDto(),
      name: 'Feodor',
      websiteUrl: 'feodor@example.com',
    };

    await createBlog(app, newBlog);
  });

  it('✅ should return blogs list; GET /api/blogs', async () => {
    await createBlog(app);
    await createBlog(app);

    const response = await request(app)
      .get(BLOGS_PATH)
      .set('Authorization', adminToken)
      .expect(HttpStatus.Ok);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
  });

  it('✅ should return driver by id; GET /api/blogs/:id', async () => {
    const createdDriver = await createBlog(app);

    const blog = await getBlogById(app, createdDriver.id);

    expect(blog).toEqual({
      ...createdDriver,
      id: expect.any(String),
      description: expect.any(String),
    });
  });

  it('✅ should update driver; PUT /api/blogs/:id', async () => {
    const createdBlog = await createBlog(app);

    const blogUpdateData: BlogsInputDto = {
      name: 'Updated Name',
      description: '999-888-7777',
      websiteUrl: 'updated@example.com',
    };

    await updateBlog(app, createdBlog.id, blogUpdateData);

    const blogResponse = await getBlogById(app, createdBlog.id);

    expect(blogResponse).toEqual({
      ...blogUpdateData,
      id: createdBlog.id,
      description: expect.any(String),
    });
  });

  it('✅ should delete driver and check after "NOT FOUND"; DELETE /api/blogs/:id', async () => {
    const createdBlog = await createBlog(app);

    await request(app)
      .delete(`${BLOGS_PATH}/${createdBlog.id}`)
      .set('Authorization', adminToken)
      .expect(HttpStatus.NoContent);

    await request(app)
      .get(`${BLOGS_PATH}/${createdBlog.id}`)
      .set('Authorization', adminToken)
      .expect(HttpStatus.NotFound);
  });
});

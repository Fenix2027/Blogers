import request from 'supertest';
import express from 'express';
import { VehicleFeature } from '../../../src/blogs/domain/blog';
import { setupApp } from '../../../src/setup-app';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { BlogsInputDto } from '../../../src/blogs/application/dtos/blogs-input.dto';
import { BLOGS_PATH } from '../../../src/core/paths/paths';
import { generateBasicAuthToken } from '../../utils/generate-admin-auth-token';
import { getDriverDto } from '../../utils/drivers/get-driver-dto';
import { clearDb } from '../../utils/clear-db';
import { createBlog } from '../../utils/drivers/create-blog';
import { getBlogById } from '../../utils/drivers/get-blog-by-id';

describe('Driver API body validation check', () => {
  const app = express();
  setupApp(app);

  const correctTestDriverData: BlogsInputDto = getDriverDto();

  const adminToken = generateBasicAuthToken();

  beforeAll(async () => {
    await clearDb(app);
  });

  it(`❌ should not create driver when incorrect body passed; POST /api/drivers'`, async () => {
    await request(app)
      .post(BLOGS_PATH)
      .send(correctTestDriverData)
      .expect(HttpStatus.Unauthorized);

    const invalidDataSet1 = await request(app)
      .post(BLOGS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send({
        name: '   ', // empty string
        description: '    ', // empty string
        websiteUrl: 'invalid email', // incorrect email
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet1.body.errorMessages).toHaveLength(4);

    const invalidDataSet2 = await request(app)
      .post(BLOGS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send({
        name: 'Feodor',
        phoneNumber: '', // empty string
        email: 'feodor@example.com',
        vehicleModel: '', // empty string
        vehicleLicensePlate: '', // empty string
        vehicleMake: '', // empty string
        vehicleYear: 2020,
        vehicleDescription: null,
        vehicleFeatures: [],
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet2.body.errorMessages).toHaveLength(4);

    const invalidDataSet3 = await request(app)
      .post(BLOGS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send({
        name: 'Feodor',
        email: 'feodor@example.com',
        phoneNumber: '', // empty string
        vehicleModel: '', // empty string
        vehicleLicensePlate: '', // empty string
        vehicleMake: '', // empty string
        vehicleYear: 2020,
        vehicleDescription: null,
        vehicleFeatures: [],
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet3.body.errorMessages).toHaveLength(4);

    // check что никто не создался
    const driverListResponse = await request(app)
      .get(BLOGS_PATH)
      .set('Authorization', adminToken);
    expect(driverListResponse.body).toHaveLength(0);
  });

  it('❌ should not update driver when incorrect data passed; PUT /api/blogs/:id', async () => {
    const createdDriver = await createBlog(app, correctTestDriverData);

    const invalidDataSet1 = await request(app)
      .put(`${BLOGS_PATH}/${createdDriver.id}`)
      .set('Authorization', generateBasicAuthToken())
      .send({
        name: '   ',
        phoneNumber: '    ',
        email: 'invalid email',
        vehicleMake: '',
        vehicleModel: 'A6',
        vehicleYear: 2020,
        vehicleLicensePlate: 'XYZ-456',
        vehicleDescription: null,
        vehicleFeatures: [],
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet1.body.errorMessages).toHaveLength(4);

    const invalidDataSet2 = await request(app)
      .put(`${BLOGS_PATH}/${createdDriver.id}`)
      .set('Authorization', generateBasicAuthToken())
      .send({
        name: 'Ted',
        email: 'ted@example.com',
        vehicleMake: 'Audi',
        vehicleYear: 2020,
        vehicleDescription: null,
        vehicleFeatures: [],
        phoneNumber: '', // empty string
        vehicleModel: '', // empty string
        vehicleLicensePlate: '', // empty string
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet2.body.errorMessages).toHaveLength(3);

    const invalidDataSet3 = await request(app)
      .put(`${BLOGS_PATH}/${createdDriver.id}`)
      .set('Authorization', generateBasicAuthToken())
      .send({
        name: 'A', //too short
        phoneNumber: '987-654-3210',
        email: 'feodor@example.com',
        vehicleMake: 'Audi',
        vehicleModel: 'A6',
        vehicleYear: 2020,
        vehicleLicensePlate: 'XYZ-456',
        vehicleDescription: null,
        vehicleFeatures: [],
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet3.body.errorMessages).toHaveLength(1);

    const driverResponse = await getBlogById(app, createdDriver.id);

    expect(driverResponse).toEqual({
      ...correctTestDriverData,
      id: createdDriver.id,
      createdAt: expect.any(String),
    });
  });

  it('❌ should not update driver when incorrect features passed; PUT /api/blogs/:id', async () => {
    const createdDriver = await createBlog(app, correctTestDriverData);

    await request(app)
      .put(`${BLOGS_PATH}/${createdDriver.id}`)
      .set('Authorization', generateBasicAuthToken())
      .send({
        name: 'Ted',
        phoneNumber: '987-654-3210',
        email: 'ted@example.com',
        vehicleMake: 'Audi',
        vehicleModel: 'A6',
        vehicleYear: 2020,
        vehicleLicensePlate: 'XYZ-456',
        vehicleDescription: null,
        vehicleFeatures: [
          VehicleFeature.ChildSeat,
          'invalid-feature' as VehicleFeature,
          VehicleFeature.WiFi,
        ],
      })
      .expect(HttpStatus.BadRequest);

    const driverResponse = await getBlogById(app, createdDriver.id);

    expect(driverResponse).toEqual({
      ...correctTestDriverData,
      id: createdDriver.id,
      createdAt: expect.any(String),
    });
  });
});

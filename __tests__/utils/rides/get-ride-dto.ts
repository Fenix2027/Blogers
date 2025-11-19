import { PostInputDto } from '../../../src/rides/dto/post-input.dto';
import { Currency } from '../../../src/rides/types/post';

export function getRideDto(driverId: number): PostInputDto {
  return {
    driverId,
    clientName: 'Bob',
    price: 200,
    currency: Currency.USD,
    fromAddress: '123 Main St, Springfield, IL',
    toAddress: '456 Elm St, Shelbyville, IL',
  };
}

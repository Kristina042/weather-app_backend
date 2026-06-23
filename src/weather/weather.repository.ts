import {
  Injectable,
  Inject,
} from '@nestjs/common';

import { Db } from 'mongodb';

@Injectable()
export class WeatherRepository {
  constructor(
    @Inject('DATABASE')
    private db: Db,
  ) {}

  collection() {
    return this.db.collection('weather');
  }
}
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class WeatherRepository {
  constructor(
    @Inject('DATABASE')
    private db: Db,
  ) {}

  private collection() {
    return this.db.collection('weather');
  }

  async get(key: string) {
    return this.collection().findOne({
      key,
      expiresAt: { $gt: new Date() },
    });
  }

  async set(key: string, data: any, ttlMinutes = 10) {
    const expiresAt = new Date(
      Date.now() + ttlMinutes * 60 * 1000,
    );

    await this.collection().updateOne(
      { key },
      {
        $set: {
          key,
          data,
          expiresAt,
        },
      },
      { upsert: true },
    );
  }
}
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseOptionsFactory,
  type MongooseModuleOptions,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConnectionConfigService implements MongooseOptionsFactory {
  constructor(private config: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.config.getOrThrow<string>('MONGODB_URI'),
    };
  }
}

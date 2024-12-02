import { Logger } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  Connection,
  ClientSession,
  QueryOptions,
} from 'mongoose';
import { MongooseBaseSchema } from './mongoose-base-schema';
import { IBaseRepository } from '../interfaces/IBaseRepository';

export abstract class MongooseAbstractRepository<
  TSchema extends MongooseBaseSchema,
> implements IBaseRepository<TSchema>
{
  protected readonly logger: Logger;

  constructor(
    protected readonly model: Model<TSchema>,
    private readonly connection: Connection,
  ) {}
  async create(
    document: Partial<Omit<TSchema, '_id'>>,
    options?: SaveOptions,
  ): Promise<TSchema> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    const newDocument = await createdDocument.save(options);
    return newDocument.toObject({ flattenObjectIds: true }) as TSchema;
  }

  async findOne(filterQuery: FilterQuery<TSchema>): Promise<TSchema> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new Error('Document not found.');
    }

    return document as TSchema;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TSchema>,
    updateQuery: UpdateQuery<TSchema>,
    options?: QueryOptions,
  ) {
    const document = await this.model.findOneAndUpdate(
      filterQuery,
      updateQuery,
      {
        ...options,
        lean: true,
        new: true,
      },
    );

    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new Error('Document not found.');
    }

    return document;
  }

  async startTransaction(): Promise<ClientSession> {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}

import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly entityModel: Model<TDocument>) {}

  async findOne(
    entityFilterQuery: FilterQuery<TDocument>,
    projection?: Record<string, unknown>,
  ): Promise<TDocument | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        ...projection,
      })
      .lean<TDocument>(true);
  }

  async find(
    entityFilterQuery: FilterQuery<TDocument>,
    projection?: Record<string, unknown>,
  ): Promise<TDocument | null> {
    return this.entityModel
      .find(entityFilterQuery, {
        ...projection,
      })
      .lean<TDocument>(true);
  }

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const entity = new this.entityModel({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await entity.save()).toJSON() as unknown as TDocument;
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<TDocument>,
    updateEntityData: UpdateQuery<TDocument>,
  ): Promise<TDocument | null> {
    const document = await this.entityModel
      .findOneAndUpdate(entityFilterQuery, updateEntityData, {
        new: true,
      })
      .lean<TDocument>(true);
    if (!document) {
      this.logger.warn(
        'Document was not found with updateEntityData',
        entityFilterQuery,
      );
      throw new NotFoundException('Document was not found');
    }
    return document;
  }

  async findOneAndDelete(
    deleteFilterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument | null> {
    const document = await this.entityModel
      .findOneAndDelete(deleteFilterQuery)
      .lean<TDocument>(true);
    if (!document) {
      this.logger.warn(
        'Document was not found with deleteFilterQuery',
        deleteFilterQuery,
      );
      throw new NotFoundException('Document was not found');
    }
    return document;
  }

  async deleteMany(
    entityFilterQuery: FilterQuery<TDocument>,
  ): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }
}

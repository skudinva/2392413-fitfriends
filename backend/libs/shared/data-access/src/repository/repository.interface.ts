import { MongoEntity, PgEntity } from '@backend/shared/core';

export interface Repository<T extends MongoEntity | PgEntity> {
  findById(id: T['id']): Promise<T | null>;
  save(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  deleteById(id: T['id']): Promise<void>;
}

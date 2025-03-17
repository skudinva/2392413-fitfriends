import { BasePostgresRepository } from '@backend/data-access';
import { Tag } from '@backend/shared/core';
import { PrismaClientService } from '@backend/training-models';
import { Injectable } from '@nestjs/common';
import { TrainingTagEntity } from './training-tag.entity';
import { TrainingTagFactory } from './training-tag.factory';

@Injectable()
export class TrainingTagRepository extends BasePostgresRepository<
  TrainingTagEntity,
  Tag
> {
  constructor(
    private readonly tagFactory: TrainingTagFactory,
    client: PrismaClientService
  ) {
    super(tagFactory, client);
  }

  public override async save(entity: TrainingTagEntity): Promise<void> {
    const record = await this.client.tag.create({
      data: {
        ...entity.toPOJO(),
      },
    });

    entity.id = record.id;
  }

  public async findByTitle(title: string): Promise<TrainingTagEntity | null> {
    const tag = await this.client.tag.findUnique({
      where: {
        title,
      },
    });

    if (!tag) {
      return null;
    }

    return this.createEntityFromDocument(tag);
  }

  public async findOrCreateByTitle(title: string): Promise<TrainingTagEntity> {
    const tag = await this.findByTitle(title);
    if (tag) {
      return tag;
    }

    const newTag = this.tagFactory.create({ title });
    await this.save(newTag);
    return newTag;
  }
  public async findOrCreateByTitles(
    titles: string[]
  ): Promise<TrainingTagEntity[]> {
    return await Promise.all(
      titles.map(async (title) => await this.findOrCreateByTitle(title))
    );
  }
}

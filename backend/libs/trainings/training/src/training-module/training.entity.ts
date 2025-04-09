import {
  PgEntity,
  StorableEntity,
  Training,
  TrainingDuration,
  TrainingLevel,
  TrainingType,
  UserGender,
} from '@backend/shared/core';

export class TrainingEntity
  extends PgEntity
  implements StorableEntity<Training>
{
  public title!: string;
  public image!: string;
  public level!: TrainingLevel;
  public type!: TrainingType;
  public duration!: TrainingDuration;
  public price!: number;
  public calories!: number;
  public description!: string;
  public gender!: UserGender;
  public video!: string;
  public rating!: number;
  public userId!: string;
  public isSpecial!: boolean;
  public specialPrice!: number;
  public createdAt!: Date;

  constructor(training?: Training) {
    super();
    this.populate(training);
  }
  public populate(training?: Training): void {
    if (!training) {
      return;
    }

    this.id = training.id;
    this.title = training.title;
    this.image = training.image;
    this.level = training.level;
    this.type = training.type;
    this.duration = training.duration;
    this.price = training.price;
    this.calories = training.calories;
    this.description = training.description;
    this.gender = training.gender;
    this.video = training.video;
    this.rating = training.rating;
    this.userId = training.userId;
    this.isSpecial = training.isSpecial;
    this.specialPrice = training.specialPrice;
    this.createdAt = training.createdAt;
  }

  toPOJO(): Training {
    return {
      id: this.id,
      title: this.title,
      image: this.image,
      level: this.level,
      type: this.type,
      duration: this.duration,
      price: this.price,
      calories: this.calories,
      description: this.description,
      gender: this.gender,
      video: this.video,
      rating: this.rating,
      userId: this.userId,
      isSpecial: this.isSpecial,
      specialPrice: this.specialPrice,
      createdAt: this.createdAt,
    };
  }
}

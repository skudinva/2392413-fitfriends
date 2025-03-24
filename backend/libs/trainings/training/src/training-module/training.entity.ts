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
  public level!: string; //TrainingLevel;
  public type!: string; //TrainingType;
  public duration!: string; //TrainingDuration;
  public price!: number;
  public calories!: number;
  public description!: string;
  public gender!: string; //UserGender;
  public video!: string;
  public rating!: number;
  public userId!: string;
  public isSpecial!: boolean;
  public createdAt!: Date;
  public averageRating!: number;

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
    this.createdAt = training.createdAt;
    this.averageRating = training.averageRating;
  }

  toPOJO(): Training {
    return {
      id: this.id,
      title: this.title,
      image: this.image,
      level: this.level as TrainingLevel,
      type: this.type as TrainingType,
      duration: this.duration as TrainingDuration,
      price: this.price,
      calories: this.calories,
      description: this.description,
      gender: this.gender as UserGender,
      video: this.video,
      rating: this.rating,
      userId: this.userId,
      isSpecial: this.isSpecial,
      createdAt: this.createdAt,
      averageRating: this.averageRating,
    };
  }
}

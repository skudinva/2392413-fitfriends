export abstract class MongoEntity {
  private _id = '';
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
}

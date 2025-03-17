export interface Comment {
  id?: string;
  trainingId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  message: string;
}

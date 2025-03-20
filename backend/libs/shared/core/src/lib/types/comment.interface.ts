export interface Comment {
  id: number;
  userId: string;
  trainingId: number;
  rating: number;
  message: string;
  createdAt: Date;
}

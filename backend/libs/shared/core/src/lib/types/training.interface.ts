export interface Training {
  id?: number;
  userId: string;
  isRepost: boolean;
  originUserId?: string | null;
  originPostId?: string | null;
  createdAt: Date;
  publicDate: Date;
  likesCount: number;
  commentsCount: number;
}

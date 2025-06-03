export enum ApplicationServiceURL {
  Auth = 'http://localhost:3001/api/auth',
  Users = 'http://localhost:3001/api/user',
  Friends = 'http://localhost:3001/api/friend',
  Training = 'http://localhost:3002/api/trainings',
  Comments = 'http://localhost:3002/api/comments',
  Orders = 'http://localhost:3002/api/orders',
  File = 'http://localhost:3003',
}

export enum ApiSection {
  Training = 'Training API',
  Like = 'Like API',
  Comment = 'Comment API',
  Order = 'Order API',
  User = 'User API',
  Friend = 'Friend API',
}

export const HttpClient = {
  MaxRedirectCount: 5,
  Timeout: 3000,
} as const;

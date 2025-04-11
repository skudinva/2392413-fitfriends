export enum ApplicationServiceURL {
  Auth = 'http://localhost:3001/api/auth',
  Users = 'http://localhost:3001/api/user',
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
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 3000;

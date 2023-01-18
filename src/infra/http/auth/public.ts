import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
/**
 * Disable authentication for specific GraphQL resolvers or REST endpoints
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

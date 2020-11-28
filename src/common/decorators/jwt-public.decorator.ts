import { SetMetadata } from '@nestjs/common';

export const JwtPublic = () => SetMetadata('jwt-public', true);

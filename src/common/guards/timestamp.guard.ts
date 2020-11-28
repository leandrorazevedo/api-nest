import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import newErrorApp from '../ErrorApp/ErrorApp';
import * as dayjs from 'dayjs';

const FIVE_MINUTES = 1000 * 60 * 5;

@Injectable()
export class TimestampGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const req: Request = context.switchToHttp().getRequest();
    const apiTimestamp = req.get('x-api-timestamp');

    if (!apiTimestamp) {
      throw new BadRequestException(
        newErrorApp({ message: 'timestamp não informado.' }),
      );
    }

    const dataAtual = dayjs();
    const dataHeaderRequest = dayjs(apiTimestamp);

    const diff = dataAtual.diff(dataHeaderRequest);

    if (diff > FIVE_MINUTES) {
      throw new BadRequestException(
        newErrorApp({ message: 'timestamp antigo.' }),
      );
    }

    return true;
  }
}

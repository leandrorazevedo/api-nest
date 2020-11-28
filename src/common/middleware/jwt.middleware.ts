import {
  ArgumentsHost,
  ExecutionContext,
  Inject,
  Injectable,
  NestMiddleware
} from '@nestjs/common';
import ExecutionContextHost from '@nestjs/core/helpers/execution-context-host'
import { Reflector, REQUEST } from '@nestjs/core';
import { ExtractJwt } from 'passport-jwt';
import newErrorApp from '../ErrorApp/ErrorApp';

@Injectable()
export class JwtMiddleware implements NestMiddleware {

  // constructor(
  //   @Inject(REQUEST) private request: Record<string, unknown>
  // ) {
  //   console.log(request)
  // }

  use(req: any, res: any, next: () => void) {

    //this.reflector.get<boolean>('roles', context.getHandler())

    // const jwtFunction = ExtractJwt.fromAuthHeaderAsBearerToken();
    // const jwt = jwtFunction(req);

    // if (!jwt) {
    //   throw new UnauthorizedException(
    //     newErrorApp({
    //       message: 'Token não informado ou informado incorretamente.',
    //     }),
    //   );
    // }

    // req.jwt = jwt;

    next();
  }
}

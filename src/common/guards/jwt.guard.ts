import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import newErrorApp from '../ErrorApp/ErrorApp';
import * as admin from 'firebase-admin';

@Injectable()
export class JwtGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Promise<boolean> | Observable<boolean> {
    // const isPublic = this.reflector.get<boolean>(
    //   'jwt-public',
    //   context.getHandler(),
    // );
    // if (isPublic) {
    //   return true;
    // }

    const avaliarJwt = this.reflector.get<boolean>(
      'avaliarJwtGuard',
      context.getHandler(),
    );

    console.log(avaliarJwt)

    if (avaliarJwt !== undefined && !avaliarJwt) {
      return true;
    }

    // console.log(context.getClass() + '-' + context.getHandler());

    const req = context.switchToHttp().getRequest();

    if (!req.jwt) {
      throw new UnauthorizedException(
        newErrorApp({ message: 'token não informado.' }),
      );
    }

    const verifyToken = async () => {
      try {
        const jwtDecoded = await admin.auth().verifyIdToken(req.jwt);

        req.userData = {
          name: jwtDecoded.name,
          user_id: jwtDecoded.user_id,
          email: jwtDecoded.email,
          email_verified: jwtDecoded.email_verified,
          gerente: jwtDecoded.gerente || false,
          roles: jwtDecoded.roles || [],
          nivelSenha: jwtDecoded.nivelSenha || 0,
        };

        // await admin
        //   .auth()
        //   .setCustomUserClaims(jwtDecoded.user_id, {
        //     nivelSenha: 8,
        //     gerente: true,
        //     roles: ['admin', 'finance'],
        //   });

        return true;
      } catch (err) {
        throw new UnauthorizedException(
          newErrorApp({ message: 'token inválido.', devMessage: err.message }),
        );
      }
    };

    return verifyToken();
  }
}

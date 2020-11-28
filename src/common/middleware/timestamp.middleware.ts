import { BadGatewayException, BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class TimestampMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // console.log('Lista de headers : ', req.headers);

    // validação do token
    // extrair o payload
    // injetar no req (payload)
    // req.user = {
    //   name: 'Leandro',
    //   email: 'ti@gruposiac.com.br'
    // }

    next();
  }
}

import { JwtMiddleware } from './common/middleware/jwt.middleware';
import newErrorApp from './common/ErrorApp/ErrorApp';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as fs from 'fs';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { JwtGuard } from './common/guards/jwt.guard';
import { ArgumentsHost, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';

const oneMinute = 1000 * 60;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: fs.readFileSync('./ssl/localhost.key'),
      cert: fs.readFileSync('./ssl/localhost.crt'),
    },
  });

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('America/Sao_Paulo');

  Date.prototype.toJSON = function () {
    return dayjs(this).tz('America/Sao_Paulo').utc(true).format();
  };

  app.enableCors({ origin: 'http://localhost:3000' });

  app.use(helmet());
  app.use(compression());

  // app.use(csurf());

  app.use(
    rateLimit({
      windowMs: oneMinute,
      max: 40,
      message: newErrorApp({ message: 'muitas tentativas' }),
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  // const reflector = app.get(Reflector)
  // app.useGlobalGuards(new JwtGuard(reflector));

  app.useGlobalGuards(new JwtGuard(app.get(Reflector)));

  app.setGlobalPrefix('api/v1');

  // const teste = (req: Request, res: Response, next: Function) => {
  //   const reflector = app.get(Reflector)
  //   console.log('reflector: ', reflector);
  //   return new JwtMiddleware();
  // };

  // app.use(teste()));

  await app.listen(process.env.PORT || 3001);

  console.log(` API executando em ${await app.getUrl()} `);
}

bootstrap();

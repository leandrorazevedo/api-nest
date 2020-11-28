import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import {
  ArgumentsHost,
  ExecutionContext,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './features/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseModule } from './firebase/firebase.module';
import { JwtMiddleware } from './common/middleware/jwt.middleware';


@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:manager@cluster-sp.cmovg.gcp.mongodb.net/api?retryWrites=true&w=majority',
      {
        useFindAndModify: false,
      },
    ),
    ProductsModule,
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, ExecutionContextHost],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(TimestampMiddleware).forRoutes(ProductsController);
    consumer
      .apply(JwtMiddleware)
      .forRoutes('*')
  }
}

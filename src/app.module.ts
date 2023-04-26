
import { PrismaModule } from 'prisma/prisma.module';
// import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtMiddleware } from './middlewares/jwt.middleware';


// @Module({
//   imports: [PrismaModule, UserModule,PostModule, CommentModule, RabbitmqModule],
  
// })
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(JwtMiddleware).forRoutes('*');
//   }
// }

@Module({
  imports: [PrismaModule, UserModule,PostModule, CommentModule, RabbitmqModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}

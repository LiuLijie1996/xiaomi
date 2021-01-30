import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';

import { MongooseModule } from '@nestjs/mongoose';
import { InitMiddleware } from './public/middleware/init.middleware';
import { AdminMiddleware } from './public/middleware/admin.middleware';
import { Config } from './public/config/Config';

@Module({
  imports: [
    // 连接数据库
    MongooseModule.forRoot(
      'mongodb://localhost:27017/xiaomi',
      { useNewUrlParser: true },
    ),

    // admin 模块
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {

    // 配置中间件
    consumer
      .apply(InitMiddleware)
      .forRoutes(`/${Config.adminPath}`)
      .apply(AdminMiddleware)// 注册中间件
      .forRoutes(`/${Config.adminPath}`)// 访问路由使用中间件
  }
 }

import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';

import { Config } from "../config/Config";

// 控制器
import { ManagerController } from './manager/manager.controller';
import { MainController } from './main/main.controller';
import { LoginController } from './login/login.controller';

// 服务
import { ToolsService } from '../public/service/tools/tools.service';
import { AdminService } from "../public/service/admin/admin.service";

// 中间件
import { AdminMiddleware } from "../public/middleware/admin.middleware";
import { InitMiddleware } from "../public/middleware/init.middleware";

// 引入 MongooseModule 用来注册数据模型的
import { MongooseModule } from '@nestjs/mongoose';
// 数据模型
import { AdminSchema } from 'src/public/schema/admin.schema';
import { RoleController } from './role/role.controller';
import { RoleSchema } from 'src/public/schema/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      // 注册 admin 数据模型
      {
        name: "Admin",
        schema: AdminSchema,
        collection: "admin",
      },
      // 注册 role 数据模型
      {
        name: "Role",
        schema: RoleSchema,
        collection: "role",
      },
    ]),
  ],
  controllers: [ManagerController, MainController, LoginController, RoleController],
  providers: [ToolsService, AdminService],
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {

    // 配置中间件
    consumer
      .apply(InitMiddleware)
      .forRoutes(`/${Config.adminPath}`)
      .apply(AdminMiddleware)// 注册中间件
      .forRoutes(`/${Config.adminPath}/*`)// 访问所有路由使用中间件
  }
}

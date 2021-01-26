import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';

import { Config } from '../public/config/Config';

// 控制器
import { ManagerController } from './controller/manager/manager.controller';
import { MainController } from './controller/main/main.controller';
import { LoginController } from './controller/login/login.controller';

// 服务
import { ToolsService } from '../public/service/tools/tools.service';
import { AdminService } from '../public/service/admin/admin.service';
import { RoleService } from '../public/service/role/role.service';
import { AccessService } from "../public/service/access/access.service";

// 中间件
import { AdminMiddleware } from '../public/middleware/admin.middleware';
import { InitMiddleware } from '../public/middleware/init.middleware';

// 引入 MongooseModule 用来注册数据模型的
import { MongooseModule } from '@nestjs/mongoose';
// 数据模型
import { AdminSchema } from 'src/public/schema/admin.schema';
import { RoleController } from './controller/role/role.controller';
import { RoleSchema } from 'src/public/schema/role.schema';
import { AccessSchema } from "src/public/schema/access";
import { AccessController } from './controller/access/access.controller';
import { RoleAccessSchema } from 'src/public/schema/role_access.schema';
import { RoleAccessService } from 'src/public/service/role-access/role-access.service';
import { FocusController } from './controller/focus/focus.controller';
import { FocusSchema } from 'src/public/schema/focus';
import { FocusService } from 'src/public/service/focus/focus.service';
import { GoodsController } from './controller/goods/goods.controller';
import { GoodsTypeController } from './controller/goods-type/goods-type.controller';
import { GoodsTypeSchema } from 'src/public/schema/goodsType.schema';
import { GoodsTypeService } from 'src/public/service/goods-type/goods-type.service';
import { GoodsTypeAttributeController } from './controller/goods-type-attribute/goods-type-attribute.controller';
import { GoodsTypeAttributeSchema } from 'src/public/schema/goodsTypeAttribute';
import { GoodsTypeAttributeService } from 'src/public/service/goods-type-attribute/goods-type-attribute.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      // 注册 admin 数据模型
      {
        name: 'Admin',
        schema: AdminSchema,
        collection: 'admin',
      },
      // 注册 role 数据模型
      {
        name: 'Role',
        schema: RoleSchema,
        collection: 'role',
      },
      // 注册 access 数据模型
      {
        name: 'Access',
        schema: AccessSchema,
        collection: 'access',
      },
      // 注册 role_access 数据模型
      {
        name: 'RoleAccess',
        schema: RoleAccessSchema,
        collection: 'role_access',
      },
      // 注册 focus 数据模型
      {
        name: 'Focus',
        schema: FocusSchema,
        collection: 'focus',
      },
      // 注册 goods_type 数据模型
      {
        name: 'GoodsType',
        schema: GoodsTypeSchema,
        collection: 'goods_type',
      },
      {
        name: 'GoodsTypeAttribute',
        schema: GoodsTypeAttributeSchema,
        collection: 'goods_type_attribute',
      },
    ]),
  ],
  controllers: [
    ManagerController,
    MainController,
    LoginController,
    RoleController,
    AccessController,
    FocusController,
    GoodsController,
    GoodsTypeController,
    GoodsTypeAttributeController,
  ],
  providers: [
    ToolsService,
    AdminService,
    RoleService,
    AccessService,
    RoleAccessService,
    FocusService,
    GoodsTypeService,
    GoodsTypeAttributeService
  ],
  exports: [
    RoleAccessService, AccessService, AdminService,
  ],
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    // 配置中间件
    consumer
      .apply(InitMiddleware)
      .forRoutes(`/${Config.adminPath}`)
      .apply(AdminMiddleware) // 注册中间件
      .forRoutes(`/${Config.adminPath}/*`); // 访问所有路由使用中间件
  }
}

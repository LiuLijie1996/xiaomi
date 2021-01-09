import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { resolve } from "path";
// 引入session
import * as session from "express-session";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 配置session中间件，当使用到session时，session可以自动给客户端下发cookie，并进行相关配置
  app.use(session({
    secret: "keyboard cat",//密钥
    rolling: true,//在每次请求时强行设置 cookie，这将重置 cookie 过期时间
    // name: "hello",//返回客户端的key的名称，默认为connect.sid
    resave: false,//强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。 don't save session if unmodifie
    saveUninitialized: true,//强制将未初始化的 session 存储。当新建了一个 session 且未设定属性或值时，它就处于未初始化状态。在设定一个 cookie 前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。（默认：true）。建议手动添加。

    // 配置cookie
    cookie: {
      maxAge: 10 * 60 * 1000,//过期时间
      httpOnly: true,//只允许后端访问
    },
  }));

  // 开放静态目录
  let publicPath: string = resolve(__dirname, "../public");
  app.useStaticAssets(publicPath);

  // 配置模板引擎
  let viewsPath: string = resolve(__dirname, "../views");
  app.setViewEngine('ejs');
  app.setBaseViewsDir(viewsPath);

  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
// 引入session
import * as session from "express-session";
import { resolve } from "path";
let ueditor = require('ueditor');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  let publicPath: string = resolve(__dirname, "../public");

  // 配置百度富文本编辑器
  app.use("/static/ueditor/ue", ueditor(publicPath, function (req, res, next) {
    // upload 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
      // 这里你可以获得上传图片的信息
      var foo = req.ueditor;
      console.log(foo.filename); // exp.png
      console.log(foo.encoding); // 7bit
      console.log(foo.mimetype); // image/png

      // 下面填写你要把图片保存到的路径 （ 以 resolve(__dirname, "../public") 作为根路径）
      var img_url = "/upload";
      console.log(img_url);

      res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    } else if (req.query.action === 'listimage') {//  客户端发起图片列表请求

      var dir_url = "/upload"; // 要展示给客户端的文件夹路径
      res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
      
    } else {// 客户端发起其它请求
      res.setHeader('Content-Type', 'application/json');
      // 这里填写 ueditor.config.json 这个文件的路径
      // let configPath = path.join(__dirname, '../static/ueditor/') + 'ueditor.config.json';
      // console.log('configPath',configPath)
      res.redirect('/ueditor/ueditor.config.json');
    }
  })
  );

  // 配置session中间件，当使用到session时，session可以自动给客户端下发cookie，并进行相关配置
  app.use(session({
    secret: "keyboard cat",//密钥
    rolling: true,//在每次请求时强行设置 cookie，这将重置 cookie 过期时间
    // name: "hello",//返回客户端的key的名称，默认为connect.sid
    resave: false,//强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。 don't save session if unmodifie
    saveUninitialized: true,//强制将未初始化的 session 存储。当新建了一个 session 且未设定属性或值时，它就处于未初始化状态。在设定一个 cookie 前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。（默认：true）。建议手动添加。

    // 配置cookie
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,//过期时间
      httpOnly: true,//只允许后端访问
    },
  }));

  // 开放静态目录
  app.useStaticAssets(publicPath);

  // 配置模板引擎
  let viewsPath: string = resolve(__dirname, "../views");
  app.setViewEngine('ejs');
  app.setBaseViewsDir(viewsPath);

  await app.listen(3000);
}
bootstrap();

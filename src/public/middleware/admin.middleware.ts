import { Injectable, NestMiddleware } from '@nestjs/common';
import { Config } from "../../config/Config";

/**
 * 后台管理系统使用的中间件
*/
@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req, res, next: () => void) {

    let userinfo = req.session.userinfo;

    // 判断用户是否登录了
    if (userinfo && userinfo.username) {
      // 配置模板全局变量
      res.locals.userinfo = userinfo;
      next();
    } else {
      let pathname = req._parsedOriginalUrl.pathname;
      
      if (pathname === `/${Config.adminPath}/login` || pathname === `/${Config.adminPath}/login/captcha` || pathname === `/${Config.adminPath}/login/doLogin`) {
        next();
      } else {
        // 重定向到登录页面
        res.redirect(`/${Config.adminPath}/login`);
      }
    }
  }
}

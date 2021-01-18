import { Injectable, NestMiddleware } from '@nestjs/common';
import { Config } from "../config/Config";
import { AdminInfo } from '../interface/adminInfo.interface';
import { AdminService } from '../service/admin/admin.service';

/**
 * 后台管理系统使用的中间件
*/
@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(
    private adminService: AdminService
  ) { }

  async use(req, res, next: () => void) {
    // 获取保存在session中的用户信息
    let userinfo: AdminInfo = req.session.userinfo;
    // 获取当前用户访问的路由地址
    let pathname = req._parsedUrl.pathname;

    // 判断用户是否登录了
    if (userinfo && userinfo.username) {
      // 配置模板全局变量
      res.locals.userinfo = userinfo;

      let adminAuth = await this.adminService.adminAuth(req);
      if (adminAuth) {
        next();
      } else {
        res.send("您没有权限访问该页面");
      }

    } else {
      if (pathname === `/${Config.adminPath}/login` || pathname === `/${Config.adminPath}/login/captcha` || pathname === `/${Config.adminPath}/login/doLogin`) {
        next();
      } else {
        // 重定向到登录页面
        res.redirect(`/${Config.adminPath}/login`);
      }
    }
  }
}

import { Body, Controller, Get, Post, Query, Render, Request, Response } from '@nestjs/common';
import { ToolsService } from "../../public/service/tools/tools.service";
import { AdminService } from '../../public/service/admin/admin.service';
import {Config } from "../../config/Config";


@Controller(`${Config.adminPath}/login`)
export class LoginController {
    constructor(private toolsService: ToolsService, private adminService: AdminService) { }

    /**
     * 登录页
    */
    @Get()
    @Render("admin/login")
    index1() {
        return {};
    }

    /**
     * 获取验证码
    */
    @Get("captcha")
    index2(@Request() req, @Response() res) {
        let captcha = this.toolsService.captcha();

        // 保存验证码
        req.session.captcha = captcha.text;

        res.type('svg');
        res.send(captcha.data);
    }

    /**
     * 提交登录
    */
    @Post("doLogin")
    async index3(@Request() req, @Response() res, @Body() body) {
        try {
            let password: String = this.toolsService.getMd5(body.password);

            // 判断验证码是否正确
            if (body.verify.toUpperCase() === req.session.captcha.toUpperCase()) {

                // 查找用户是否存在
                let userResult = await this.adminService.find({
                    username: body.username,
                    password: password,
                });

                if (userResult.length > 0) {
                    req.session.userinfo = userResult[0];
                    res.redirect(`/${Config.adminPath}`);
                } else {
                    this.toolsService.errorPage({
                        res: res,
                        msg: "账号或密码错误",
                        href: `/${Config.adminPath}/login`,
                    });
                }
            } else {
                this.toolsService.errorPage({
                    res: res,
                    msg: "验证码不正确",
                    href: `/${Config.adminPath}/login`,
                    
                });
            }
        } catch (error) {
            this.toolsService.errorPage({
                res: res,
                msg: "服务异常",
                href: `/${Config.adminPath}/login`,
            });
        }
    }

    /**
     * 退出登录
    */
    @Get("loginOut")
    loginOut(@Request() req, @Response() res) {
        req.session.userinfo = null;
        res.redirect(`/${Config.adminPath}/login`);
    }
}

import { Injectable } from '@nestjs/common';
import * as svgCaptcha from "svg-captcha";
import * as md5 from "md5";

/**
 * 工具集
*/
@Injectable()
export class ToolsService {
    /**
     * 验证码
    */
    captcha() {
        var captcha = svgCaptcha.create({
            size: 1, // 验证码长度
            ignoreChars: '0o1i', // 验证码字符中排除 0o1i
            noise: 4, // 干扰线条的数量
            color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
            background: '#cc9966', // 验证码图片背景颜色
            height: 36,
        });

        return captcha;
    }

    /**
     * md5加密方法
    */
    getMd5(value: String) {
        return md5(value);
    }

    /**
     * 跳转到错误页面
    */
    errorPage({ res, msg, href }) {
        res.render("admin/public/error", {
            "msg": msg,
            "href": href,
        });
    }

    /**
     * 跳转到成功页面
    */
    succeed({ res, msg, href }) {
        res.render("admin/public/succeed", {
            "msg": msg,
            "href": href,
        });
    }
}

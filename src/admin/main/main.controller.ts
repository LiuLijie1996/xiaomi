import { Controller, Get, Render } from '@nestjs/common';
import {Config } from "../../config/Config";


@Controller(`${Config.adminPath}`)
export class MainController {
    /**
     * 页面框架
    */
    @Get()
    @Render("admin/main/index") //模板文件
    index1() {
        return {};
    }

    /**
     * 欢迎页
    */
    @Get("welcome")
    @Render("admin/main/welcome") //模板文件
    index2() {
        return {};
    }
}

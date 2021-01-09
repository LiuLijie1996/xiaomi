import { Controller, Get, Render } from '@nestjs/common';
import {Config } from "../../config/Config";

/**
 * 管理员
*/
@Controller(`${Config.adminPath}/manager`)
export class ManagerController {
    /**
     * 管理员列表
    */
    @Get()
    @Render("admin/manager/index")
    index1() {
        return {};
    }

    /**
     * 添加管理员
    */
    @Get("add")
    @Render("admin/manager/add")
    index2() {
        return {};
    }
}

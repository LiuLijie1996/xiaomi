import { Body, Controller, Get, Render, Response } from '@nestjs/common';
import { Config } from "../../config/Config"
import { RoleService } from "../../public/service/role/role.service";
import { ToolsService } from "../../public/service/tools/tools.service";


@Controller(Config.adminPath + '/role')
export class RoleController {
    constructor(private roleService: RoleService, private toolsService:ToolsService) { }

    @Get()
    @Render("admin/role/index")
    async index() {
        let result = await this.roleService.find({});
        return {
            roleList: result,
        }
    }

    @Get("add")
    @Render("admin/role/add")
    async index2(@Body() body, @Response() res) {
        let result = await this.roleService.add(body);

        this.toolsService.succeed({
            res:res,
            msg: "角色添加成功",
            href: `/${Config.adminPath}/role/add`
        })
    }
}

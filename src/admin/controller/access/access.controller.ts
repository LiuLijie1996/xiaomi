import { Body, Controller, Get, Post, Query, Render, Response } from '@nestjs/common';
import * as mongoose from "mongoose";
import { Config } from '../../../public/config/Config';
import { AccessService } from "../../../public/service/access/access.service";
import { ToolsService } from "../../../public/service/tools/tools.service"

@Controller(`${Config.adminPath}/access`)
export class AccessController {

    constructor(private accessService: AccessService, private toolsService: ToolsService) { }

    /**
     * 权限列表
    */
    @Get()
    @Render("admin/access/index")
    async index() {
        let result = await this.accessService.aggregate().aggregate([
            {
                $lookup: {
                    localField: "_id",
                    
                    from: 'access',//需要关联的表的名称
                    foreignField: "module_id",
                    as: "items",
                }
            },
            {
                $match: {
                    module_id: '0',
                }
            }
        ]);

        return {
            list: result,
        };
    }

    /**
     * 添加权限页面
    */
    @Get("add")
    @Render("admin/access/add")
    async add() {
        // 查找模块
        let result = await this.accessService.find({ "module_id": '0' });
        return {
            moduleList: result,
        };
    }

    /**
     * 添加权限
    */
    @Post("doAdd")
    async doAdd(@Body() body, @Response() res) {
        try {
            if (body.module_id != '0') {
                body.module_id = mongoose.Types.ObjectId(body.module_id);
            }

            await this.accessService.add(body);

            this.toolsService.succeed({
                res,
                msg: "添加模块成功",
                href: `/${Config.adminPath}/access`,
            });
        } catch (error) {
            this.toolsService.errorPage({
                res,
                msg: "添加模块失败",
                href: `/${Config.adminPath}/access/add`,
            });
        }
    }

    /**
     * 修改权限页面
    */
    @Get("edit")
    @Render("admin/access/edit")
    async edit(@Query() query) {
        // 查找模块列表
        let moduleResult = await this.accessService.find({ "module_id": '0' });

        // 查找对应的数据
        let result = await this.accessService.find({ "_id": query.id });

        return {
            moduleList: moduleResult,
            item: result[0],
        };
    }

    /**
     * 修改权限
    */
    @Post("doEdit")
    async doEdit(@Query() query, @Body() body, @Response() res) {
        try {
            body.module_id = mongoose.Types.ObjectId(body.module_id);
            // 修改数据
            await this.accessService.update({ _id: query.id }, body);

            this.toolsService.succeed({
                res,
                msg: "修改模块成功",
                href: `/${Config.adminPath}/access`,
            });
        } catch (error) {
            this.toolsService.errorPage({
                res,
                msg: "修改权限失败",
                href: `/${Config.adminPath}/access`,
            });
        }
    }

    /**
     * 删除权限
    */
    @Get('delete')
    async delete(@Query() query, @Response() res) {
        try {
            await this.accessService.delete({ _id: query.id });

            this.toolsService.succeed({
                res,
                msg: "删除模块成功",
                href: `/${Config.adminPath}/access`,
            });
        } catch (error) {
            this.toolsService.errorPage({
                res,
                msg: "删除权限失败",
                href: `/${Config.adminPath}/access`,
            });
        }
    }
}

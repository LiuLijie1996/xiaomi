import { Body, Controller, Get, Post, Query, Render, Response } from '@nestjs/common';
import { Config } from "../../../public/config/Config";
import { RoleService } from "../../../public/service/role/role.service";
import { ToolsService } from "../../../public/service/tools/tools.service";
import { AdminService } from "../../../public/service/admin/admin.service";

/**
 * 管理员
*/
@Controller(`${Config.adminPath}/manager`)
export class ManagerController {

    constructor(
        private roleService: RoleService,
        private toolsService: ToolsService,
        private adminService: AdminService,
    ) { }

    /**
     * 管理员列表
    */
    @Get()
    @Render("admin/manager/index")
    async index1(@Query() query) {
        let result;
        if (query.username) {
            result = await this.adminService.aggregate().aggregate([
                {
                    $lookup: {
                        from: 'role',//需要关联的表的名称
                        localField: "role_id",//admin表中的字段
                        foreignField: "_id",//role表中的字段
                        as: "role",//将查询到数据保存指定字段中
                    }
                },
                {
                    $match: {
                        username: query.username,
                    }
                }
            ]);
        } else {
            result = await this.adminService.aggregate().aggregate([
                {
                    $lookup: {
                        from: 'role',//需要关联的表的名称
                        localField: "role_id",//admin表中的字段
                        foreignField: "_id",//role表中的字段
                        as: "role",//将查询到数据保存指定字段中
                    }
                }
            ]);
        }

        return {
            adminList: result,
        };
    }

    /**
     * 添加管理员页面
    */
    @Get("add")
    @Render("admin/manager/add")
    async index2() {
        // 获取角色
        let result = await this.roleService.find({});
        return {
            roleList: result,
        };
    }

    /**
     * 添加管理员
    */
    @Post("doAdd")
    async doAdd(@Body() body, @Response() res) {
        body.username = body.username.trim();

        if (body.username == '' || body.password.length < 6) {
            // 跳转到错误页面
            this.toolsService.errorPage({
                res: res,
                msg: "用户名或密码不合法",
                href: `/${Config.adminPath}/manager/add`,
            });
        } else {
            body.password = this.toolsService.getMd5(body.password.trim());

            // 查找管理员是否以及存在
            let result = await this.adminService.find({
                username: body.username,
            });

            if (result.length === 0) {
                // 存储用户数据
                await this.adminService.add(body);

                this.toolsService.succeed({
                    res: res,
                    msg: "添加成功",
                    href: `/${Config.adminPath}/manager`,
                });
            } else {
                this.toolsService.errorPage({
                    res: res,
                    msg: "管理员已经存在",
                    href: `/${Config.adminPath}/manager/add`,
                });
            }

        }
    }

    /**
     * 修改管理员页面
    */
    @Get("edit")
    @Render("admin/manager/edit")
    async edit(@Query() query) {
        // 查找管理员
        let result = await this.adminService.find({
            _id: query.id,
        });
        // 获取角色
        let roleList = await this.roleService.find();

        return {
            adminItem: result[0],
            roleList,
        };
    }

    /**
     * 修改管理员
    */
    @Post("doEdit")
    async doEdit(@Body() body, @Response() res) {
        let _id = body._id.trim();
        let password = body.password.trim();

        if (password === '') {
            // 修改数据
            this.adminService.update({ _id, }, {
                username: body.username,
                phone: body.phone,
                email: body.email,
                role_id: body.role_id,
            });

            this.toolsService.succeed({
                res,
                msg: "操作成功",
                href: `/${Config.adminPath}/manager`,
            });
        } else {
            if (password.length < 6) {
                this.toolsService.errorPage({
                    res,
                    msg: "密码不规范",
                    href: `/${Config.adminPath}/manager/edit`,
                });
            } else {
                password = this.toolsService.getMd5(password);
                // 修改数据
                this.adminService.update({ _id, }, {
                    password,
                    username: body.username,
                    phone: body.phone,
                    email: body.email,
                    role_id: body.role_id,
                });

                this.toolsService.succeed({
                    res,
                    msg: "操作成功",
                    href: `/${Config.adminPath}/manager`,
                });
            }
        }
    }

    /**
     * 删除管理员
    */
    @Get("delete")
    async delete(@Query() query, @Response() res) {
        await this.adminService.delete({ _id: query.id });

        this.toolsService.succeed({
            res,
            msg: "操作成功",
            href: `/${Config.adminPath}/manager`,
        });
    }
}

import { Body, Controller, Get, Post, Render, Request, Response } from '@nestjs/common';
import { AccessService } from 'src/public/service/access/access.service';
import { FocusService } from 'src/public/service/focus/focus.service';
import { GoodsCateService } from 'src/public/service/goods-cate/goods-cate.service';
import { GoodsTypeAttributeService } from 'src/public/service/goods-type-attribute/goods-type-attribute.service';
import { GoodsTypeService } from 'src/public/service/goods-type/goods-type.service';
import { RoleAccessService } from 'src/public/service/role-access/role-access.service';
import { ToolsService } from 'src/public/service/tools/tools.service';
import { Config } from "../../../public/config/Config";


@Controller(`${Config.adminPath}`)
export class MainController {
    constructor(
        private accessService: AccessService,
        private roleAccessService: RoleAccessService,
        private focusService: FocusService,
        private toolsService: ToolsService,
        private goodsTypeService: GoodsTypeService,
        private goodsTypeAttr: GoodsTypeAttributeService,
        private goodsCateService: GoodsCateService,
    ) { }

    /**
     * 页面框架
    */
    @Get()
    @Render("admin/main/index") //模板文件
    async index1(@Request() req) {
        // 获取当前用户信息
        let userInfo = req.session.userinfo;

        // 获取权限列表
        let result = await this.accessService.aggregate().aggregate([
            {
                $lookup: {
                    localField: "_id",//当前表的字段

                    from: 'access',//需要关联的表的名称
                    foreignField: "module_id",//关联表的字段
                    as: "items",
                }
            },
            {
                $match: {
                    module_id: '0',
                }
            }
        ]);

        // 查询当前角色拥有的权限
        let resultRoleAccess = await this.roleAccessService.find({
            role_id: userInfo.role_id,
        });

        // 遍历出当前角色拥有的权限id
        let roleAccessList = [];
        for (let index = 0; index < resultRoleAccess.length; index++) {
            const access_id = resultRoleAccess[index].access_id.toString();
            roleAccessList.push(access_id);
        }

        // 遍历第一层权限列表
        for (let index = 0; index < result.length; index++) {
            let access_id = result[index]._id.toString();

            // 判断第一层权限id 是否在当前角色拥有的权限id中
            if (roleAccessList.includes(access_id)) {
                result[index].checked = true;
            }


            // 判断子权限是否选中了
            for (let j = 0; j < result[index].items.length; j++) {
                let item_access_id = result[index].items[j]._id.toString();
                if (roleAccessList.includes(item_access_id)) {
                    result[index].items[j].checked = true;
                }
            }
        }

        return {
            list: result,
        };
    }

    /**
     * 欢迎页
    */
    @Get("welcome")
    @Render("admin/main/welcome") //模板文件
    index2() {
        return {};
    }

    /**
     * 修改字段值
    */
    @Post('updateKey')
    async updateKey(@Body() body) {
        let model = body.model;

        try {
            await this[model].update({ _id: body.id }, {
                [body.key]: body.value,
            });

            return {
                code: 200,
                msg: "操作成功"
            };

        } catch (error) {
            console.log(error);

            return {
                code: 0,
                msg: "操作失败"
            };
        }
    }
}

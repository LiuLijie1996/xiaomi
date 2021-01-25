import { Body, Controller, Get, Post, Query, Render, Response } from '@nestjs/common';
import { GoodsTypeService } from 'src/public/service/goods-type/goods-type.service';
import { ToolsService } from 'src/public/service/tools/tools.service';
import { Config } from "../../../public/config/Config";

@Controller(Config.adminPath + '/goodsType')
export class GoodsTypeController {
    constructor(
        private goodsTypeService: GoodsTypeService,
        private tools: ToolsService,
    ) { }

    @Get()
    @Render('admin/goodsType/index')
    async index() {
        let result = await this.goodsTypeService.find();

        return {
            goodsTypeList: result,
        };
    }

    @Get('add')
    @Render('admin/goodsType/add')
    add() {
        return {};
    }

    @Post('doAdd')
    async doAdd(@Body() body, @Response() res) {
        await this.goodsTypeService.create(body);
        this.tools.succeed({
            res,
            msg: "操作成功",
            href: "/" + Config.adminPath + '/goodsType/add'
        });
    }

    @Get('delete')
    delete(@Query() query, @Response() res) {
        this.goodsTypeService.delete({ _id: query.id });
        this.tools.succeed({
            res,
            msg: "操作成功",
            href: "/" + Config.adminPath + '/goodsType/add'
        });
    }

    @Get('edit')
    @Render('admin/goodsType/edit')
    async edit(@Query() query) {
        let result = await this.goodsTypeService.find({ _id: query.id });
        return {
            item: result[0],
        };
    }

    @Post('doEdit')
    async doEdit(@Query() query, @Body() body, @Response() res) {
        await this.goodsTypeService.update({ _id: query.id }, body);
        this.tools.succeed({
            res,
            msg: "操作成功",
            href: "/" + Config.adminPath + '/goodsType/add'
        });
    }
}

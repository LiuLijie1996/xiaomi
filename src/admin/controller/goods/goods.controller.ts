import { All, Body, Controller, Get, Post, Render, Request, Response } from '@nestjs/common';
import { GoodsService } from 'src/public/service/goods/goods.service';
import { ToolsService } from 'src/public/service/tools/tools.service';
import { Config } from "../../../public/config/Config";

@Controller(Config.adminPath + '/goods')
export class GoodsController {
    constructor(
        private toolsService: ToolsService,
        private goodsService: GoodsService,
    ) { }


    @Get()
    @Render('admin/goods/index')
    add() {
        return {};
    }

    @Get('add')
    @Render('admin/goods/add')
    doAdd() {
        return {};
    }
}

import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { Config } from "../../../public/config/Config";

@Controller(Config.adminPath + '/goods')
export class GoodsController {
    @Get()
    @Render('admin/goods/add')
    add() {
        return {};
    }

    @Post('doAdd')
    doAdd(@Body() body) {
        console.log(body);
    }
}

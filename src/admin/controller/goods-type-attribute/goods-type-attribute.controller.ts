import { Body, Controller, Get, Post, Query, Render, Response } from '@nestjs/common';
import { GoodsTypeAttributeService } from 'src/public/service/goods-type-attribute/goods-type-attribute.service';
import { GoodsTypeService } from 'src/public/service/goods-type/goods-type.service';
import { ToolsService } from 'src/public/service/tools/tools.service';
import { Config } from "../../../public/config/Config";

@Controller(Config.adminPath + '/goodsTypeAttribute')
export class GoodsTypeAttributeController {
    constructor(
        private toolsService: ToolsService,
        private goodsTypeService: GoodsTypeService,
        private goodsTypeAttributeService: GoodsTypeAttributeService,
    ) { }


    @Get()
    @Render('admin/goodsTypeAttribute/index')
    async index(@Query() query) {
        // 查找商品类型
        let goodsTypes = await this.goodsTypeService.find({ _id: query.id });
        let result = await this.goodsTypeAttributeService.find({ cate_id: query.id });

        return {
            goodsTypeItem: goodsTypes[0],
            goodsTypeAttribute: result,
        };
    }

    @Get('add')
    @Render('admin/goodsTypeAttribute/add')
    async add(@Query() query) {
        // 查找商品类型
        let goodsTypes = await this.goodsTypeService.find();
        let goodsTypeItem = await this.goodsTypeService.find({ _id: query.id });

        return {
            goodsTypes: goodsTypes,
            goodsTypeItem: goodsTypeItem[0],
        };
    }

    @Get('edit')
    @Render('admin/goodsTypeAttribute/edit')
    async edit(@Query() query) {
        // 查找商品类型
        let goodsTypes = await this.goodsTypeService.find();
        // 查找商品类型对应的属性
        let goodsTypeAttribute = await this.goodsTypeAttributeService.find({ _id: query.id });

        return {
            goodsTypes: goodsTypes,
            goodsTypeAttrItem: goodsTypeAttribute[0],
        };
    }

    @Post('doAdd')
    async doAdd(@Body() body) {
        let result = await this.goodsTypeAttributeService.create(body);


        return { result };
    }

    @Get('delete')
    async delete(@Query() query) {
        let result = await this.goodsTypeAttributeService.delete({
            _id: query.id
        });

        return { result };
    }

    @Post('doEdit')
    async doEdit(@Query() query, @Body() body) {
        body.attr_value = body.attr_type != 3 ? '' : body.attr_value;

        let result = await this.goodsTypeAttributeService.update({
            _id: query.id
        }, body);

        return { result };
    }
}

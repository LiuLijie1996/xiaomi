import { All, Body, Controller, Get, Post, Query, Render, Request, Response, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { async } from 'rxjs';
import { GoodsAttrService } from 'src/public/service/goods-attr/goods-attr.service';
import { GoodsCateService } from 'src/public/service/goods-cate/goods-cate.service';
import { GoodsColorService } from 'src/public/service/goods-color/goods-color.service';
import { GoodsImagesService } from 'src/public/service/goods-images/goods-images.service';
import { GoodsTypeAttributeService } from 'src/public/service/goods-type-attribute/goods-type-attribute.service';
import { GoodsTypeService } from 'src/public/service/goods-type/goods-type.service';
import { GoodsService } from 'src/public/service/goods/goods.service';
import { ToolsService } from 'src/public/service/tools/tools.service';
import { Config } from "../../../public/config/Config";

@Controller(Config.adminPath + '/goods')
export class GoodsController {
    constructor(
        private toolsService: ToolsService,
        private goodsService: GoodsService,
        private goodsCateService: GoodsCateService,
        private goodsColorService: GoodsColorService,
        private goodsTypeService: GoodsTypeService,
        private goodsTypeAttrService: GoodsTypeAttributeService,
        private goodsImagesService: GoodsImagesService,
        private goodsAttrService: GoodsAttrService,
    ) { }


    @Get()
    @Render('admin/goods/index')
    index() {
        return {};
    }

    @Get('add')
    @Render('admin/goods/add')
    async add() {
        // 获取商品分类
        let goodsCate = await this.goodsCateService.getModel([
            {
                $lookup: {
                    from: "goods_cate",
                    localField: "_id",
                    foreignField: "pid",
                    as: "items"
                },
            },
            {
                $match: {
                    "pid": '0',
                },
            }
        ]);

        // 获取商品颜色
        let goodsColor = await this.goodsColorService.find();

        // 获取商品类型
        let goodsType = await this.goodsTypeService.find();

        return {
            goodsCate: goodsCate,
            goodsColor: goodsColor,
            goodsType: goodsType,
        };
    }

    // 获取商品类型属性
    @Get("getGoodsTypeAttr")
    async getGoodsTypeAttr(@Query() query) {
        let goodsTypeAttr = await this.goodsTypeAttrService.find({
            cate_id: query.id
        });

        return {
            goodsTypeAttr: goodsTypeAttr,
        };
    }

    @Post('doAdd')
    @UseInterceptors(FileInterceptor('goods_img'))
    async doAdd(@Body() body, @Query() query, @UploadedFile() file) {

        // 保存商品主图
        let result = file && this.toolsService.saveFile(file);

        // 保存商品数据
        body.goods_color = body.goods_color ? body.goods_color.join(',') : '';
        let goodsAdd = await this.goodsService.create(Object.assign(body, {
            goods_img: result ? result.fileUrl : null,
        }));

        // 增加图库
        if (goodsAdd._id && body.goods_image_list) {
            body.goods_image_list.forEach(async img => {
                await this.goodsImagesService.create({
                    goods_id: goodsAdd._id,
                    img_url: img,
                });
            })
        }

        // 增加商品属性
        let attr_id_list = body.attr_id_list;
        let attr_value_list = body.attr_value_list;
        if (goodsAdd._id && attr_id_list) {
            attr_id_list.forEach(async (attr_id, index) => {
                // 获取当前商品类型对应的商品类型属性
                let goodsTypeAttr = await this.goodsTypeAttrService.find({
                    _id: attr_id,
                });

                // 添加商品规格数据
                await this.goodsAttrService.create({
                    goods_id: goodsAdd._id,
                    goods_cate_id: goodsAdd.goods_cate_id,
                    attributer_id: attr_id,
                    attributer_type: goodsTypeAttr[0].attr_type,
                    attributer_title: goodsTypeAttr[0].title,
                    attributer_value: attr_value_list[index],
                });
            })
        }

        /*
            {
                "title": "小米11",
                "sub_title": "小米11小米11",
                "goods_version": "v2.0",
                "cate_id": "601413b7c153640d0c3d397a",
                "cname": "",
                "shop_price": "4299",
                "market_price": "5000",
                "status": "1",
                "is_best": "1",
                "is_hot": "1",
                "relation_goods": "",
                "goods_gift": "",
                "goods_fitting": "",
                "goods_attr": "",
                "goods_type_id": "60164726f5221b2a44548694",
                "attr_id_list": [
                    "60164773f5221b2a44548697",
                    "60164780f5221b2a44548698",
                    "60164795f5221b2a44548699",
                    "601647a8f5221b2a4454869a",
                    "601647b6f5221b2a4454869b",
                    "601647c3f5221b2a4454869c",
                    "601647cff5221b2a4454869d"
                ],
                "attr_value_list": [
                    "好性能",
                    "相机好",
                    "是\r\n",
                    "屏幕好",
                    "外观好",
                    "电池好",
                    "传感器好"
                ],
                "goods_image_list": [
                    "/upload/20210131/1612097761322.jpg"
                ],
                "goods_content": ""
            }
        */

        return body;
    }

    // 上传图片
    @Post('doImageUpload')
    @UseInterceptors(FileInterceptor('file'))
    doImageUpload(@UploadedFile() file) {
        let result = this.toolsService.saveFile(file);

        console.log(result);


        return { link: result.fileUrl };
    }
}
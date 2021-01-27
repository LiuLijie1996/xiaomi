import { Body, Controller, Get, Post, Query, Render, Response, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GoodsCateService } from 'src/public/service/goods-cate/goods-cate.service';
import { ToolsService } from 'src/public/service/tools/tools.service';
import { Config } from "../../../public/config/Config";

@Controller(Config.adminPath + '/goodsCate')
export class GoodsCateController {
    constructor(
        private toolsService: ToolsService,
        private goodsCateService: GoodsCateService,
    ) { }

    @Get()
    @Render("admin/goodsCate/index")
    async index() {
        let result = await this.goodsCateService.getModel([
            {
                $lookup: {
                    localField: "_id",//当前表的字段

                    from: 'goods_cate',//需要关联的表的名称
                    foreignField: "pid",//关联表的字段
                    as: "items",
                },
            },
            {
                $match: {
                    pid: '0',
                },
            }
        ]);
        
        return {
            cateList: result,
        };
    }

    @Get("add")
    @Render("admin/goodsCate/add")
    async add() {
        let result = await this.goodsCateService.find({ pid: '0' });
        return {
            cateList: result,
        };
    }

    @Post("doAdd")
    @UseInterceptors(FileInterceptor('img_file'))
    async doAdd(@Body() body, @UploadedFile() file) {
        let saveFile = this.toolsService.saveFile(file);
        // 保存数据
        let result = await this.goodsCateService.create({
            ...body,
            pid: body.pid == '0' ? '0' : this.toolsService.objectId(body.pid),
            cate_img: file && saveFile.fileUrl,
        });

        return { result };
    }

    @Get("edit")
    @Render("admin/goodsCate/edit")
    async edit(@Query() query) {
        let cateItem = await this.goodsCateService.find({ _id: query.id });
        let result = await this.goodsCateService.find({ pid: '0' });

        return {
            cateItem: cateItem[0],
            cateList: result,
        };
    }

    @Post("doEdit")
    @UseInterceptors(FileInterceptor('img_file'))
    async doEdit(@Body() body, @UploadedFile() file, @Query() query) {
        let saveFile = this.toolsService.saveFile(file);

        let result = null;
        if(file){
            // 保存数据
            result = await this.goodsCateService.update({_id: query.id}, {
                ...body,
                pid: body.pid == '0' ? '0' : this.toolsService.objectId(body.pid),
                cate_img: saveFile.fileUrl,
            });
        }else{
            // 保存数据
            result = await this.goodsCateService.update({_id: query.id}, {
                ...body,
                pid: body.pid == '0' ? '0' : this.toolsService.objectId(body.pid),
            });
        }
        

        return { result };
    }

    @Get("delete")
    async delete(@Query() query) {
        await this.goodsCateService.delete({ _id: query.id });

        return {};
    }
}

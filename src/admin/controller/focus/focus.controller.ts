import { Body, Controller, Get, Post, Query, Render, Response, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FocusService } from 'src/public/service/focus/focus.service';
import { Config } from '../../../public/config/Config';
import { ToolsService } from "../../../public/service/tools/tools.service"

@Controller(`${Config.adminPath}/focus`)
export class FocusController {
    constructor(
        private tools: ToolsService,
        private focusService: FocusService,
    ) { }

    @Get()
    @Render("admin/focus/index")
    async index() {
        let find = await this.focusService.find();
        return {
            focusList: find,
        };
    }

    @Get('add')
    @Render("admin/focus/add")
    add() {
        return {};
    }

    @Post('doAdd')
    @UseInterceptors(FileInterceptor('img_file'))
    async doAdd(@Body() body, @UploadedFile() file, @Response() res) {
        try {
            if (file) {
                // 保存文件
                let result = this.tools.saveFile(file);

                // 文件地址（服务器路径）
                let fileUrl = result.fileUrl || null;

                // 保存表单数据
                await this.focusService.save({
                    ...body,
                    imgUrl: fileUrl,
                });
            } else {
                // 保存表单数据
                await this.focusService.save(body);
            }

            this.tools.succeed({
                res,
                href: `/${Config.adminPath}/focus/add`,
                msg: "操作成功"
            });
        } catch (error) {
            this.tools.errorPage({
                res,
                href: `/${Config.adminPath}/focus/add`,
                msg: "操作失败"
            });
        }
    }

    @Get('edit')
    @Render("admin/focus/edit")
    async edit(@Query() query) {
        let find = await this.focusService.find({
            _id: query.id,
        });


        return {
            focusItem: find[0],
        };
    }

    @Post('doEdit')
    @UseInterceptors(FileInterceptor('img_file'))
    async doEdit(@Query() query, @Body() body, @UploadedFile() file, @Response() res) {

        try {
            if (file) {
                // 保存文件
                let result = this.tools.saveFile(file);

                // 文件地址（服务器路径）
                let fileUrl = result.fileUrl || null;

                // 修改数据
                await this.focusService.update({
                    _id: query.id,
                }, Object.assign(body, { imgUrl: fileUrl }));
            } else {
                // 修改数据
                await this.focusService.update({
                    _id: query.id,
                }, {
                    title: body.title,
                    type: body.type,
                    url: body.url,
                    sort: body.sort,
                });
            }

            this.tools.succeed({
                res,
                href: `/${Config.adminPath}/focus`,
                msg: "操作成功"
            });
        } catch (error) {
            this.tools.errorPage({
                res,
                href: `/${Config.adminPath}/focus`,
                msg: "操作失败"
            });
        }
    }

    /**
     * 删除轮播图
    */
    @Get('delete')
    async delete(@Query() query, @Response() res) {
        try {
            await this.focusService.delete({ _id: query.id });

            this.tools.succeed({
                res,
                href: `/${Config.adminPath}/focus`,
                msg: "操作成功"
            });
        } catch (error) {

            this.tools.errorPage({
                res,
                href: `/${Config.adminPath}/focus`,
                msg: "操作失败"
            });
        }
    }
}

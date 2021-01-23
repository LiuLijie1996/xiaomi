import { Body, Controller, Get, Post, Render, Response, UploadedFile, UseInterceptors } from '@nestjs/common';
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
            let result = this.tools.saveFile(file);

            // 判断文件上传是否成功
            if (result.code === 0) {
                return result;
            }

            // 文件地址（服务器路径）
            let fileUrl = result.fileUrl;

            // 保存表单数据
            await this.focusService.save({
                ...body,
                imgUrl: fileUrl,
            });

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
}

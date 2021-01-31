import { Injectable } from '@nestjs/common';
import * as svgCaptcha from "svg-captcha";
import * as md5 from "md5";
import * as moment from "moment";
import * as mongoose from "mongoose";
import { resolve, extname } from 'path';
import { createWriteStream, mkdirSync, existsSync } from 'fs';
import * as Jimp from "jimp";

/**
 * 工具集
*/
@Injectable()
export class ToolsService {
    /**
     * 验证码
    */
    captcha() {
        var captcha = svgCaptcha.create({
            size: 1, // 验证码长度
            ignoreChars: '0o1i', // 验证码字符中排除 0o1i
            noise: 4, // 干扰线条的数量
            color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
            background: '#cc9966', // 验证码图片背景颜色
            height: 36,
        });

        return captcha;
    }

    /**
     * md5加密方法
    */
    getMd5(value: String) {
        return md5(value);
    }

    /**
     * 跳转到错误页面
    */
    errorPage({ res, msg, href }) {
        res.render("admin/public/error", {
            "msg": msg,
            "href": href,
        });
    }

    /**
     * 跳转到成功页面
    */
    succeed({ res, msg, href }) {
        res.render("admin/public/succeed", {
            "msg": msg,
            "href": href,
        });
    }

    /**
     * 保存文件
    */
    // 保存文件
    saveFile(file) {
        try {
            let getTime = new Date().getTime();
            // 设置目录名
            let dirName = moment(getTime).format("YYYYMMDD");
            // 设置文件名
            let fileName = getTime + extname(file.originalname);

            // 拼接出保存文件的路径
            let savePath = resolve(__dirname, "../../../../public/upload/" + dirName);

            // 如果目录不存在则创建一个目录
            if (!existsSync(savePath)) {
                // 创建目录
                mkdirSync(savePath);
            }

            // 创建写入流
            let createWrite = createWriteStream(savePath + '/' + fileName);
            // 写入文件
            createWrite.write(file.buffer);

            return {
                code: 200,
                msg: "上传成功",
                fileUrl: '/upload/' + dirName + '/' + fileName,
                savePath: savePath + '/' + fileName,
            };
        } catch (error) {
            return {
                code: 0,
                msg: error,
            };
        }
    }

    /**
     * 转换id
    */
    objectId(id) {
        return mongoose.Types.ObjectId(id);
    }


    /**
     * 缩略图
     */
    jimpImg(json: { filePath: string, width?: number, height?: number }) {
        // 缩略图
        Jimp.read(json.filePath, function (err, lenna) {
            if (err) {
                console.log('---', JSON.stringify(err));
                return;
            }
            lenna.resize(json.width || 200, json.height || 200)            // resize
                .quality(60)                 // set JPEG quality
                .write(json.filePath + `_${json.width || 200}x${json.height || 200}` + extname(json.filePath)); // save
        });
    }
}

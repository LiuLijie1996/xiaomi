import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdminInfo } from "../../interface/adminInfo.interface";

@Injectable()
export class AdminService {
    // @InjectModel('Admin')  注入 Admin 数据模型
    constructor(@InjectModel('Admin') private readonly adminModel) { }

    // 查找数据
    async find(json: AdminInfo = {}) {
        return await this.adminModel.find(json);
    }

    // 增加数据
    async add(json: AdminInfo = {}) {
        return await this.adminModel.create(json);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccessDataType } from "../../interface/access.interface";

@Injectable()
export class AccessService {
    constructor(@InjectModel('Access') private readonly accessModel) { }

    /**
     * 查找数据
    */
    async find(json: AccessDataType = {}) {
        let result = await this.accessModel.find(json);
        return result;
    }

    /**
     * 添加数据
    */
    async add(json: AccessDataType) {
        let result = await this.accessModel.create(json);
        return result;
    }

    /**
     * 修改数据
    */
    async update(json1: AccessDataType, json2: AccessDataType) {
        let result = await this.accessModel.updateOne(json1, json2);
        return result;
    }

    /**
     * 删除数据
    */
    async delete(json: AccessDataType) {
        let result = await this.accessModel.deleteOne(json);
        return result;
    }

    /**
     * 添加数据
    */
    aggregate() {
        return this.accessModel;
    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GoodsCateInterface } from 'src/public/interface/goods-cate.interface';

@Injectable()
export class GoodsCateService {
    constructor(
        @InjectModel('GoodsCate') private readonly goodsCateModel
    ) { }

    /**
     * 增
     */
    async create(json: GoodsCateInterface) { 
        return await this.goodsCateModel.create(json);
    }

    /**
     * 删
     */
    async delete(json: GoodsCateInterface) { 
        return await this.goodsCateModel.deleteOne(json);
    }

    /**
     * 改
     */
    async update(json1: GoodsCateInterface, json2: GoodsCateInterface) { 
        return await this.goodsCateModel.updateOne(json1, json2);
    }

    /**
     * 查
     */
    async find(json: GoodsCateInterface = {}) { 
        return await this.goodsCateModel.find(json);
    }

    /**
     * 聚合管道
     */
    getModel(arr: any[]){
        return this.goodsCateModel.aggregate(arr);
    }
}

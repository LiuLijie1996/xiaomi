import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GoodsAttrInterface } from 'src/public/interface/goods_attr.interface';

@Injectable()
export class GoodsAttrService {
    constructor(
        @InjectModel('GoodsAttr') private readonly goodsAttrModel
    ) { }

    /**
     * 增
     */
    async create(json: GoodsAttrInterface) { 
        return await this.goodsAttrModel.create(json);
    }

    /**
     * 删
     */
    async delete(json: GoodsAttrInterface) { 
        return await this.goodsAttrModel.deleteOne(json);
    }

    /**
     * 改
     */
    async update(json1: GoodsAttrInterface, json2: GoodsAttrInterface) { 
        return await this.goodsAttrModel.updateOne(json1, json2);
    }

    /**
     * 查
     */
    async find(json: GoodsAttrInterface = {}) { 
        return await this.goodsAttrModel.find(json);
    }
}

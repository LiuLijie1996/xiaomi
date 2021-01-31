import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GoodsTypeAttribute } from 'src/public/interface/goods-type-attribute.interface';

@Injectable()
export class GoodsTypeAttributeService {
    constructor(@InjectModel('GoodsTypeAttribute') private readonly goodsTypeAttributeModel) { }

    /**
     * 增
     */
    async create(json: GoodsTypeAttribute = {}) {
        return this.goodsTypeAttributeModel.create(json);
    }

    /**
     * 删
     */
    async delete(json: GoodsTypeAttribute) {
        return this.goodsTypeAttributeModel.deleteOne(json);
    }

    /**
     * 查找
     */
    async find(json: GoodsTypeAttribute = {}): Promise<GoodsTypeAttribute> {
        return this.goodsTypeAttributeModel.find(json);
    }

    /**
     * 修改
     */
    async update(json1: GoodsTypeAttribute, json2: GoodsTypeAttribute) {
        return this.goodsTypeAttributeModel.updateOne(json1, json2);
    }
}

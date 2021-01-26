import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GoodsTypeInterface } from 'src/public/interface/goods-type.interface';

@Injectable()
export class GoodsTypeService {
    constructor(
        @InjectModel('GoodsType') private readonly goodsTypeModel
    ) { }

    /**
     * 查找商品类型
     */
    async find(json: GoodsTypeInterface = {}) {
        return await this.goodsTypeModel.find(json);
    }

    /**
     * 增加商品类型
     */
    async create(json: GoodsTypeInterface) {
        return await this.goodsTypeModel.create(json);
    }

    /**
     * 删除商品类型
     */
    async delete(json: GoodsTypeInterface) {
        return await this.goodsTypeModel.deleteOne(json);
    }

    /**
     * 修改商品类型
     */
    async update(json1: GoodsTypeInterface, json2: GoodsTypeInterface) {
        return await this.goodsTypeModel.updateOne(json1, json2);
    }
}

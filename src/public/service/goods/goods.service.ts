import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GoodsInterface } from 'src/public/interface/goods.interface';

@Injectable()
export class GoodsService {
    constructor(@InjectModel('Goods') private readonly goodsModel) { }

    /**
     * 增
     */
    async create(json: GoodsInterface) {
        return this.goodsModel.create(json);
    }

    /**
     * 删
     */
    async delete(json: GoodsInterface) {
        return this.goodsModel.deleteOne(json);
    }

    /**
     * 改
     */
    async update(json1: GoodsInterface, json2: GoodsInterface) {
        return this.goodsModel.updateOne(json1, json2);
    }

    /**
     * 查
     */
    async find(json: GoodsInterface = {}) {
        return this.goodsModel.find(json);
    };
}

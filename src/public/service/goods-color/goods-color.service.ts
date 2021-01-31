import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GoodsColorInterface } from 'src/public/interface/goods-color.interface';

@Injectable()
export class GoodsColorService {
    constructor(
        @InjectModel('GoodsColor') private readonly goodsColorModel
    ) { }

    /**
     * 增
     */
    async create(json: GoodsColorInterface) { 
        return await this.goodsColorModel.create(json);
    }

    /**
     * 删
     */
    async delete(json: GoodsColorInterface) { 
        return await this.goodsColorModel.deleteOne(json);
    }

    /**
     * 改
     */
    async update(json1: GoodsColorInterface, json2: GoodsColorInterface) { 
        return await this.goodsColorModel.updateOne(json1, json2);
    }

    /**
     * 查
     */
    async find(json: GoodsColorInterface = {}) { 
        return await this.goodsColorModel.find(json);
    }
}

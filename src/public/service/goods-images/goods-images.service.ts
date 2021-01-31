import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GoodsImagesInterface } from 'src/public/interface/goods_images.interface';

@Injectable()
export class GoodsImagesService {
    constructor(
        @InjectModel('GoodsImages') private readonly goodsImagesModel
    ) { }

    /**
     * 增
     */
    async create(json: GoodsImagesInterface) { 
        return await this.goodsImagesModel.create(json);
    }

    /**
     * 删
     */
    async delete(json: GoodsImagesInterface) { 
        return await this.goodsImagesModel.deleteOne(json);
    }

    /**
     * 改
     */
    async update(json1: GoodsImagesInterface, json2: GoodsImagesInterface) { 
        return await this.goodsImagesModel.updateOne(json1, json2);
    }

    /**
     * 查
     */
    async find(json: GoodsImagesInterface = {}) { 
        return await this.goodsImagesModel.find(json);
    }
}

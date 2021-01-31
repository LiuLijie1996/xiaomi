/**
 * 商品图片数据表
*/

import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const GoodsImagesSchema = new Schema({
    // 商品id
    goods_id: {
        type: Schema.Types.ObjectId,
    },

    // 图片地址
    img_url: {
        type: String,
    },

    // 图片颜色
    color_id: {
        type: Schema.Types.Mixed,
    },

    // 排序
    sort: {
        type: Number,
        default: 100,
    },

    // 增加时间
    add_time: {
        type: Number,
        default: Date.now(),
    },

    // 状态
    status: {
        type: Number,
        default: 1,
    },
});
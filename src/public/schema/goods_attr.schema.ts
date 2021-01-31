/**
 * 商品规格数据表
*/

import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const GoodsAttrSchema = new Schema({
    // 商品id
    goods_id: {
        type: Schema.Types.ObjectId,
    },

    // 商品分类id
    goods_cate_id: {
        type: Schema.Types.ObjectId,
    },

    // 
    attributer_cate_id: {
        type: Schema.Types.ObjectId,
    },

    // 
    attributer_id: {
        type: Schema.Types.ObjectId,
    },

    attributer_type: {
        type: String,
    },

    attributer_title: {
        type: String,
    },

    attributer_value: {
        type: String,
    },

    // 状态
    status: {
        type: Number,
        default: 1,
    },

    // 增加时间
    add_time: {
        type: Number,
        default: Date.now(),
    },

    // 排序
    sort: {
        type: Number,
        default: 100,
    },
});
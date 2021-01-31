/**
 * 商品颜色数据表
*/

import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const GoodsColorSchema = new Schema({
    // 颜色的名称
    color_name: {
        type: String,
    },

    // 颜色值
    color_value: {
        type: String,
    },

    // 状态
    status: {
        type: Number,
        default: 1,
    },

    add_time: {
        type: Number,
        default: Date.now(),
    },
});
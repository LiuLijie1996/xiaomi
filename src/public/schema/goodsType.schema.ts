/**
 * 商品类型数据表
*/

import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const GoodsTypeSchema = new Schema({
    /**
     * 类型标题
    */
    title: {
        type: String,
        required: true,
    },

    /**
     * 类型描述
     */
    description: {
        type: String,

    },

    /**
     * 添加时间
     */
    add_time: {
        type: Number,
        default: Date.now(),
    },

    /**
     * 状态
     */
    status: {
        type: Number,
        default: 1,
    },
});
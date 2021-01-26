/**
 * 商品类型属性数据表
*/

import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const GoodsTypeAttributeSchema = new Schema({
    /**
     * 当前类型属性 属于哪个类型下的属性 （和goodsType进行关联的）
    */
    cate_id: {
        type: Schema.Types.ObjectId,
    },

    /**
     * 属性名称
     */
    title: {
        type: String,
        required: true,
    },

    /**
     * 类型：1、input  2、textarea    3、select
     */
    attr_type: {
        type: Number,
        required: true,
        enum: [1, 2, 3],
    },

    /**
     * 文本框默认值
     *  input、textarea 的默认值是空
     *  select框默认值：是 否
     */
    attr_value: {
        type: String,
    },

    /**
     * 状态
     */
    status: {
        type: Number,
        default: 1,
    },

    /**
     * 添加时间
     */
    add_time: {
        type: Number,
        default: Date.now(),
    },
});
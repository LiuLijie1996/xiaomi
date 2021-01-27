/**
 * 商品分类数据表
*/

import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const GoodsCateSchema = new Schema({
    // 分类标题
    title: { type: String },

    // 分类封面图
    cate_img: { type: String },

    // 跳转链接
    link: { type: String },

    // 指定当前分类的模板
    template: { type: String },

    // 混合类型
    pid: { type: Schema.Types.Mixed },

    // seo相关的标题 关键字 描述
    sub_title: { type: String },
    keywords: { type: String },
    description: { type: String },

    // 状态
    status: { type: Number, default: 1 },

    // 排序
    sort: {
        type: Number,
        default: 100,
    },

    // 添加时间
    add_time: {
        type: Number,
        default: Date.now(),
    },
});
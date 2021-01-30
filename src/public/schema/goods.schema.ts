/**
 * 商品数据表
*/

import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const GoodsSchema = new Schema({
    //商品标题
    title: {
        type: String,
        required: true,
    },

    // 副标题
    sub_title: {
        type: String,
    },

    // 商品编码
    goods_sn: {
        type: String,
    },

    // 商品分类id
    cate_id: {
        type: Schema.Types.ObjectId,
    },

    // 商品点击数量
    click_count: {
        type: Number,
        default: 100,
    },

    // 商品库存
    goods_number: {
        type: Number,
        default: 100,
    },

    // 商铺价格
    shop_price: {
        type: Number,
    },

    // 市场价格
    market_price: {
        type: Number,
    },

    // 关联商品
    relation_goods: {
        type: String,
    },

    // 商品属性
    goods_attrs: {
        type: String,
    },

    // 商品版本
    goods_version: {
        type: String,
    },

    // 商品图片
    goods_img: {
        type: String,
    },

    // 商品关联的赠品
    goods_gift: {
        type: String,
    },

    // 商品配件
    goods_fitting: {
        type: String,
    },

    // 商品颜色
    goods_color: {
        type: String,
    },

    // 商品关键词
    goods_keywords: {
        type: String,
    },

    // 商品描述
    goods_desc: {
        type: String,
    },

    // 商品内容
    goods_content: {
        type: String,
    },

    // 商品排序
    sort: {
        type: Number,
        default: 100,
    },

    // 是否删除
    is_delete: {
        type: Number,
    },

    // 是否热销
    is_hot: {
        type: Number,
    },

    // 是否精选
    is_best: {
        type: Number,
    },

    // 是否最新商品
    is_new: {
        type: Number,
    },

    // 商品类型id
    goods_type_id: {
        type: Schema.Types.ObjectId,
    },

    // 商品状态
    status: {
        type: Number,
        default: 1,
    },

    // 添加时间
    add_time: {
        type: Number,
        default: Date.now(),
    },
});

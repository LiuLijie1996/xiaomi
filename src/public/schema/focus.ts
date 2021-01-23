import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * 权限表
*/
export const FocusSchema = new Schema({
    /**
     * 分类：
     *   1、网站  2、APP  3、小程序
    */
    type: {
        type: String,
    },

    /**
     * 轮播图标题
    */
    title: {
        type: String,
    },

    /**
     * 路由跳转地址
    */
    url: {
        type: String,
    },

    /**
     * 轮播图服务器地址
    */
    imgUrl: {
        type: String,
    },

    /**
     * 排序
    */
    sort: {
        type: Number,
        default: 100,
    },

    /**
     * 添加时间
    */
    add_time: {
        type: Number,
        default: Date.now(),
    },
});
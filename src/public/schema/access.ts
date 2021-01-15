import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
const d = new Date();

export const AccessSchema = new Schema({
    /**
     * 模块名称
    */
    module_name: {
        type: String,
    },

    /**
     * 操作名称
    */
    action_name: {
        type: String,
    },

    /**
     * 节点类型：
     *   1、表示模块  2、表示菜单  3、操作
    */
    type: {
        type: Number,
    },

    /**
     * 路由跳转地址
    */
    url: {
        type: String,
    },

    /**
     * 此module_id和当前模型的_id关联
     * module_id = 0  表示模块
    */
    module_id: {
        // 混合类型
        type: Schema.Types.Mixed,
    },

    /**
     * 排序
    */
    sort: {
        type: Number,
        default: 100,
    },

    /**
     * 描述
    */
    description: {
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
        default: d.getTime(),
    },
});
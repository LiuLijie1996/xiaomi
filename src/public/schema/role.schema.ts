import * as mongoose from 'mongoose';

/**
 * 角色数据表
*/
export const RoleSchema = new mongoose.Schema({
    // 标题
    title: { type: String },

    // 描述
    description: { type: String },

    // 状态
    status: { type: Number },

    // 添加时间
    add_time: {
        type: Number,
        default: new Date().getTime(),
    },
});
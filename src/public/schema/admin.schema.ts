import * as mongoose from 'mongoose';

export const AdminSchema = new mongoose.Schema({
    // 用户名
    username: { type: String },

    // 密码
    password: { type: String },

    // 手机号
    phone: { type: String },

    // 邮箱
    email: { type: String, },

    // 状态
    status: {
        type: Number,
        default: 1,
    },

    // 角色id
    role_id: { type: mongoose.Schema.Types.ObjectId },

    // 添加时间
    add_time: {
        type: Number,
        default: new Date().getTime(),
    },

    // 1超级管理员  2普通管理员
    is_super: { 
        type: Number,
        default: 2,
     },
});
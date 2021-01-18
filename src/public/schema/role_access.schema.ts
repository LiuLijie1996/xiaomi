import * as mongoose from 'mongoose';

/**
 * 角色权限数据表
*/
export const RoleAccessSchema = new mongoose.Schema({
    // 角色id
    role_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },

    // 权限id
    access_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
});
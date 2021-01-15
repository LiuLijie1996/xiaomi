import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

interface RoleAccessDataType {
    role_id?: string
    access_id?: string
}

@Injectable()
export class RoleAccessService {
    constructor(@InjectModel('RoleAccess') private readonly roleAccessModel) { }

    // 查找角色权限
    async find(json: RoleAccessDataType) {
        let result = await this.roleAccessModel.find(json);

        return result;
    }

    // 增加角色权限
    async add(json: RoleAccessDataType) {
        let result = await this.roleAccessModel.create(json);

        return result;
    }

    // 删除角色权限
    async deleteMany(json: RoleAccessDataType) {
        let result = await this.roleAccessModel.deleteMany(json);
        return result;
    }
}

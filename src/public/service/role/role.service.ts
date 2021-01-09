import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleSchema } from '../../schema/role.schema';
import { RoleDataType } from '../../interface/role.interface';

@Injectable()
export class RoleService {
  // @InjectModel('Role')  注入 Role 数据模型
  constructor(@InjectModel('Role') private readonly roleModel) {}

  /**
   * 查找数据
   */
  async find(json: RoleDataType) {
    let result = await this.roleModel.find(json);
    return result;
  }

  /**
   * 增加数据
   */
  async add(json: RoleDataType) {
    let result = await this.roleModel.create(json);
    return result;
  }

  /**
   * 修改数据
   */
  async update(json1: RoleDataType, json2: RoleDataType) {
    let result = await this.roleModel.updateOne(json1, json2);
    return result;
  }
}

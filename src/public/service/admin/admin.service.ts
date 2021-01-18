import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Config } from 'src/public/config/Config';
import { AdminInfo } from "../../interface/adminInfo.interface";
import { AccessService } from '../access/access.service';
import { RoleAccessService } from '../role-access/role-access.service';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel('Admin') private readonly adminModel,
        private roleAccessService: RoleAccessService,
        private accessService: AccessService,
    ) { }

    /**
     * 查找数据
    */
    async find(json: AdminInfo = {}) {
        return await this.adminModel.find(json);
    }

    /**
     * 增加数据
    */
    async add(json: AdminInfo = {}) {
        return await this.adminModel.create(json);
    }

    /**
     * 修改数据
    */
    async update(json1: AdminInfo = {}, json2: AdminInfo = {}) {
        return await this.adminModel.updateOne(json1, json2);
    }

    /**
     * 删除数据
    */
    async delete(json: AdminInfo = {}) {
        return await this.adminModel.deleteOne(json);
    }

    /**
     * 聚合管道
    */
    aggregate() {
        return this.adminModel;
    }

    // 管理员的身份验证
    async adminAuth(req) {
        // 当前访问的路由
        let pathname = req._parsedUrl.pathname;
        // 当前用户信息
        let userInfo = req.session.userinfo;

        if (pathname === '/' + Config.adminPath || pathname === '/' + Config.adminPath + '/welcome' || pathname === '/' + Config.adminPath + '/login/loginOut') {
            return true;
        }

        // 判断是不是超级管理员
        if (userInfo.is_super == 1) {
            return true;
        }

        // 1.获取当前的用户角色id, 通过角色id获取角色对应的权限
        let role_id = userInfo.role_id;
        let result = await this.roleAccessService.find({ role_id: role_id.toString(), });

        // 遍历所有权限存放在数组中
        let roleAccessList = [];
        result.forEach(item => {
            roleAccessList.push(item.access_id.toString());
        });

        // 2.获取当前url对应的权限id

        let url = req._parsedUrl.pathname.toString().replace(`/${Config.adminPath}/`, '');

        let access = await this.accessService.find({
            url: url,
        });

        if (access.length) {
            // 判断有没有权限
            if (roleAccessList.includes(access[0]._id.toString())) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

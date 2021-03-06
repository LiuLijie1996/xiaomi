import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Response,
} from '@nestjs/common';
import { AccessService } from 'src/public/service/access/access.service';
import { Config } from '../../../public/config/Config';
import { RoleService } from '../../../public/service/role/role.service';
import { ToolsService } from '../../../public/service/tools/tools.service';
import { RoleAccessService } from "../../../public/service/role-access/role-access.service";

@Controller(Config.adminPath + '/role')
export class RoleController {
  constructor(
    private roleService: RoleService,
    private toolsService: ToolsService,
    private accessService: AccessService,
    private roleAccessService: RoleAccessService,
  ) { }

  /**
   * 角色列表
   */
  @Get()
  @Render('admin/role/index')
  async index(@Query() query) {
    let result: [];
    if (query.title === '') {
      result = await this.roleService.find({});
    } else {
      result = await this.roleService.find(query);
    }

    return {
      roleList: result,
    };
  }

  /**
   * 添加角色页面
   */
  @Get('add')
  @Render('admin/role/add')
  async add(@Body() body, @Response() res) {
    return {};
  }

  /**
   * 添加角色
   */
  @Post('doAdd')
  async doAdd(@Body() body, @Response() res) {
    let result = await this.roleService.add(body);

    this.toolsService.succeed({
      res: res,
      msg: '角色添加成功',
      href: `/${Config.adminPath}/role/add`,
    });
  }

  /**
   * 修改角色页面
   */
  @Get('update')
  @Render('admin/role/update')
  async update(@Body() body, @Response() res, @Query() query) {
    let result = await this.roleService.find({
      _id: query.id,
    });

    return {
      roleItem: result[0],
    };
  }

  /**
   * 修改角色
   */
  @Post('doUpdate')
  async doUpdate(@Body() body, @Response() res, @Query() query) {
    await this.roleService.update({ _id: query.id }, body);

    this.toolsService.succeed({
      res: res,
      msg: '角色修改成功',
      href: `/${Config.adminPath}/role`,
    });
  }

  /**
   * 删除角色
   */
  @Get('delete')
  async delete(@Response() res, @Query() query) {
    await this.roleService.delete({ _id: query.id });

    this.toolsService.succeed({
      res: res,
      msg: '角色删除成功',
      href: `/${Config.adminPath}/role`,
    });
  }

  /**
   * 授权页面
   */
  @Get('auth')
  @Render("admin/role/auth")
  async auth(@Query() query) {
    // 获取权限列表
    let result = await this.accessService.aggregate().aggregate([
      {
        $lookup: {
          localField: "_id",//当前表的字段

          from: 'access',//需要关联的表的名称
          foreignField: "module_id",//关联表的字段
          as: "items",
        }
      },
      {
        $match: {
          module_id: '0',
        }
      }
    ]);

    // 查询当前角色拥有的权限
    let resultRoleAccess = await this.roleAccessService.find({
      role_id: query.id,
    });

    // 遍历出当前角色拥有的权限id
    let roleAccessList = [];
    for (let index = 0; index < resultRoleAccess.length; index++) {
      const access_id = resultRoleAccess[index].access_id.toString();
      roleAccessList.push(access_id);
    }

    // 遍历第一层权限列表
    for (let index = 0; index < result.length; index++) {
      let access_id = result[index]._id.toString();

      // 判断第一层权限id 是否在当前角色拥有的权限id中
      if (roleAccessList.includes(access_id)) {
        result[index].checked = true;
      }


      // 判断子权限是否选中了
      for (let j = 0; j < result[index].items.length; j++) {
        let item_access_id = result[index].items[j]._id.toString();
        if (roleAccessList.includes(item_access_id)) {
          result[index].items[j].checked = true;
        }
      }
    }

    return {
      list: result,
      role_id: query.id,
    };
  }

  /**
   * 存储授权
   */
  @Post('doAuth')
  async doAuth(@Body() body, @Query() query, @Response() res) {
    let role_id = query.id;
    let access_node: string[] = body.access_node;

    // 删除所有存储的权限
    await this.roleAccessService.deleteMany({
      role_id: role_id,
    });

    // 存储这次选择的权限
    if (access_node) {
      for (let index = 0; index < access_node.length; index++) {
        const access_id = access_node[index];
        await this.roleAccessService.add({
          role_id: role_id,
          access_id: access_id,
        });
      }
    }

    this.toolsService.succeed({
      res,
      msg: "操作成功",
      href: "/" + Config.adminPath + "/role",
    });
  }
}

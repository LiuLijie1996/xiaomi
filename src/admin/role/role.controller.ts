import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Response,
} from '@nestjs/common';
import { Config } from '../../config/Config';
import { RoleService } from '../../public/service/role/role.service';
import { ToolsService } from '../../public/service/tools/tools.service';

@Controller(Config.adminPath + '/role')
export class RoleController {
  constructor(
    private roleService: RoleService,
    private toolsService: ToolsService,
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
}

/**
 * 权限的数据类型
*/
export interface AccessDataType {
    /**
     * 模块id
    */
    _id?: string;

    /**
     * 模块名称
    */
    module_name?: string;

    /**
     * 操作名称
    */
    action_name?: string;

    /**
     * 节点类型：
     *   1、表示模块  2、表示菜单  3、操作
    */
    type?: number;

    /**
     * 路由跳转地址
    */
    url?: string;

    /**
     * 此module_id和当前模型的_id关联
     * module_id = 0  表示模块
    */
    module_id?: string;

    /**
     * 排序
    */
    sort?: number;

    /**
     * 描述
    */
    description?: string;

    /**
     * 状态
    */
    status?: number;

    /**
     * 添加时间
    */
    add_time?: number;
}

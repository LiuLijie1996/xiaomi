/**
 * 商品规格数据类型
*/
export interface GoodsAttrInterface {
    _id?: string;
    goods_id?: string;
    goods_cate_id?: string;
    attributer_cate_id?: string;
    attributer_id?: string;
    attributer_type?: string;
    attributer_title?: string;
    attributer_value?: string;
    status?: number;
    add_time?: number;
    sort?: number;
}

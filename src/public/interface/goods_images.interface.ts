/**
 * 商品图片的数据类型
*/
export interface GoodsImagesInterface {
    _id?: string;
    goods_id?: string;
    img_url?: string;
    color_id?: string;
    sort?: number;
    add_time?: number;
    status?: number;
}

import * as moment from "moment";

export class Helper {
    /**
     * 字符串截取
     * @str   截取字符串
     * @start    开始截取位置
     * @end    结束截取位置
    */
    static substring(str: string, start: number, end: number) {
        if (end) {
            return str.substring(start, end);
        } else {
            return str.substring(start);
        }
    }

    /**
     * 时间戳格式化
    */
   static moment(time:number){
    return moment(time).format('YYYY-MM-DD HH:mm');
   }
}
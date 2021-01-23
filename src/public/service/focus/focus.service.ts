import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FocusInterface } from 'src/public/interface/focus.interface';

@Injectable()
export class FocusService {
    constructor(@InjectModel('Focus') private readonly focusModel) { }

    /**
     * 保存数据
    */
    async save(json: FocusInterface) {
        return this.focusModel.create(json);
    }

    /**
     * 获取轮播
    */
    async find(json: FocusInterface = {}) {
        return this.focusModel.find(json);
    }
}

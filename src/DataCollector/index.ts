import { PlatformTypeEnum } from "../lib/enums";
import XHSDataCollector from "./XHSDataCollector";


export default class DataCollectorContext{

    constructor(platform:PlatformTypeEnum){
        switch(platform){
            case PlatformTypeEnum.小红书:
                new XHSDataCollector();
                break;
        }
    }


}

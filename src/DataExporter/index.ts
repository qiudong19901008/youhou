import BiliAuthorDataExporter from "./BiliAuthorDataExporter";
import BiliSearchDataExporter from "./BiliSearchDataExporter";
import DYSearchDataExporter from "./DYSearchDataExporter";
import XHSDataExporter from "./XHSDataExporter";


export enum DataExporterTypeEnum{
    小红书 = 'XHS',
    抖音搜索 = 'DY_SEARCH',
    抖音作者 = 'DY_AUTHOR',
    B站搜索 = 'BILI_SEARCH',
    B站作者 = 'BILI_AUTHOR',
}

export default class DataExporterContext{

    constructor(type:DataExporterTypeEnum){
        switch(type){
            case DataExporterTypeEnum.小红书:
                new XHSDataExporter();
                break;
            case DataExporterTypeEnum.抖音搜索:
                new DYSearchDataExporter();
                break;
            case DataExporterTypeEnum.B站搜索:
                new BiliSearchDataExporter();
                break;
            case DataExporterTypeEnum.B站作者:
                new BiliAuthorDataExporter();
                break;
            // case DataExporterTypeEnum.抖音作者:
            //     // new XHSDataExporter();
            //     break;
        }
    }

}
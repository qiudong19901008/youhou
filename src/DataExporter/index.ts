import DYSearchDataExporter from "./DYSearchDataExporter";
import XHSDataExporter from "./XHSDataExporter";


export enum DataExporterTypeEnum{
    小红书 = 'XHS',
    抖音搜索 = 'DY_SEARCH',
    抖音作者 = 'DY_AUTHOR',
}

export default class DataExporterContext{

    constructor(type:DataExporterTypeEnum){
        switch(type){
            case DataExporterTypeEnum.小红书:
                new XHSDataExporter();
                break;
            case DataExporterTypeEnum.抖音搜索:
                // new XHSDataExporter();
                new DYSearchDataExporter();
                break;
            case DataExporterTypeEnum.抖音作者:
                // new XHSDataExporter();
                break;
        }
    }

}
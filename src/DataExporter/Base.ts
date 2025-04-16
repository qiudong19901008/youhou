import DataToCsvExporter from "../lib/DataToCsvExporter";
import DataExporterHelper from "./DataExporterHelper";


export type BaseRowObjType = {
    title:string,
    url:string,
    uniqueId:string,

    authorName:string,
    authorUrl:string,
    authorUniqueId:string,

    thumbnail:string,
}

export type RowType = [
    // '笔记标题', '笔记链接', '作者', '作者链接', '点赞数', '是否违规', '播放时长', '封面','浏览量'
    title:string,
    url:string,
    uniqueId:string,
    thumbnail:string,

    authorName:string,
    authorUrl:string,
    authorUniqueId:string,

    viewCountStr:string,
    likeCountStr:string,
    durationSecondsStr:string,

    illegal:string,

    param1:string,
]
// '标题', '链接', '唯一标识', '封面', '作者名', '作者链接','作者唯一标识', '浏览量', '点赞数','播放时长','是否违规'
export type RowObjType = {
    title:string,
    url:string,
    uniqueId:string,
    thumbnail:string,

    authorName:string,
    authorUrl:string,
    authorUniqueId:string,

    viewCountStr:string,
    likeCountStr:string,
    durationSecondsStr:string,

    illegal:string,

    param1:string,

}


export default abstract class Base{

    protected countElement:HTMLDivElement;
    protected downloadBtn:HTMLButtonElement;
    protected rows:RowObjType[] = [];
    protected headerArr:RowType = [
        '标题', 
        '链接', 
        '唯一标识', 
        '封面', 

        '作者名', 
        '作者链接',
        '作者唯一标识', 

        '浏览量', 
        '点赞数',
        '播放时长',

        '是否违规',

        '参数1',
    ]

    constructor(){
        this.countElement = DataExporterHelper.createCountElement();
        this.downloadBtn = DataExporterHelper.creatDownloadBtn(this._getCsvExporter());
    }

    protected abstract tryGetSearchPageSearchKeywords():string;
    protected abstract tryGetAuthorPageAuthorName():string;
    protected abstract getDefaultDownloadFilename():string;

    private _getDownloadFilename(){
        let res = this.tryGetSearchPageSearchKeywords();
        if(!res){
            res = this.tryGetAuthorPageAuthorName();
        }
        return res?res:this.getDefaultDownloadFilename();
    }

    private _getCsvExporter = ()=>{
        const fn = this._getDownloadFilename()
        // console.log(this.rows)
        // console.log(fn)
        // console.log(this.headerArr)
        const res = new DataToCsvExporter({
            rowObjArr:this.rows,
            fn,
            headerArr:this.headerArr,
        })
        return res;
    }

    



}
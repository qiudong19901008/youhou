import DataToCsvExporter from "../lib/DataToCsvExporter";

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

        '是否违规'
    ]

    constructor(){
        this.countElement = this.createCountElement();
        this.downloadBtn = this.creatDownloadBtn();
    }

    protected abstract tryGetSearchPageSearchKeywords():string;
    protected abstract tryGetAuthorPageAuthorName():string;
    protected abstract getDefaultDownloadFilename():string;

    protected abstract getExportToCsvType():'my'|'export-to-csv';


    private _getDownloadFilename(){
        let res = this.tryGetSearchPageSearchKeywords();
        if(!res){
            res = this.tryGetAuthorPageAuthorName();
        }
        return res?res:this.getDefaultDownloadFilename();
    }

    protected createCountElement = ()=>{
        const countElement = document.createElement("div");
        countElement.style.position = "fixed";
        countElement.style.bottom = "100px";
        countElement.style.left = "20px";
        countElement.style.zIndex = "9999";
        countElement.style.backgroundColor = "#fff";
        countElement.style.padding = "10px";
        countElement.style.borderRadius = "5px";
        countElement.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
        countElement.style.fontWeight = "bold";
        countElement.style.fontSize = "16px";
        countElement.style.color = "#333";
        document.body.appendChild(countElement);
        return countElement;
    }

    protected creatDownloadBtn = ()=>{
        const downloadBtn = document.createElement("button");
        downloadBtn.id = 'downloadDataBtn';
        downloadBtn.innerText = "下载数据";
        downloadBtn.style.position = "fixed";
        downloadBtn.style.bottom = "140px";
        downloadBtn.style.left = "20px";
        downloadBtn.style.zIndex = "9999";
        downloadBtn.style.backgroundColor = "#4CAF50";
        downloadBtn.style.color = "#fff";
        downloadBtn.style.border = "none";
        downloadBtn.style.borderRadius = "5px";
        downloadBtn.style.padding = "10px";
        downloadBtn.style.fontSize = "16px";
        downloadBtn.style.cursor = "pointer";
        downloadBtn.addEventListener("click", () => {
            const fn = this._getDownloadFilename()
            console.log(this.rows)
            console.log(fn)
            console.log(this.headerArr)
            new DataToCsvExporter({
                rowObjArr:this.rows,
                fn,
                headerArr:this.headerArr,
                type:this.getExportToCsvType(),
            }).run();
        });
        document.body.appendChild(downloadBtn);
        return downloadBtn;
    }


//     // 导出函数，将数据导出为CSV文件
    

}
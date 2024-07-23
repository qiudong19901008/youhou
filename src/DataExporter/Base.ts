export type RowType = [
    // '笔记标题', '笔记链接', '作者', '作者链接', '点赞数', '是否违规'
    title:string,
    url:string,
    authorName:string,
    authorUrl:string,
    likeCount:string,
    illegal:string,
]

export default abstract class Base{

    protected countElement:HTMLDivElement;
    protected downloadBtn:HTMLButtonElement;
    protected rows:RowType[] = [];

    constructor(){
        this.countElement = this.createCountElement();
        this.downloadBtn = this.creatDownloadBtn(this._getDownloadFilename());
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

    protected creatDownloadBtn = (filename:string)=>{
        const downloadBtn = document.createElement("button");
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
            this.exportToCSV(this.rows, filename);
        });
        document.body.appendChild(downloadBtn);
        return downloadBtn;
    }


    // 导出函数，将数据导出为CSV文件
    protected exportToCSV = (rows:RowType[], filename:string)=>{
        // 删除第三行数据
        //data.splice(2, 1);
        // 添加BOM头以处理UTF-8编码
        const begin = "data:text/csv;charset=utf-8,\uFEFF";
        const content = rows.map((row,i) => {
            const one =  row.join(",");
            return one;
        }).join("\n");
        const csv = begin + content;
        const encodedUri = encodeURI(csv);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        // 需要将链接元素添加到文档中才能生效
        link.click();
    }

}
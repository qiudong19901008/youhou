import Base from "./Base";


type RowType = [
    // '笔记标题', '笔记链接', '作者', '作者链接', '点赞数'
    title:string,
    url:string,
    authorName:string,
    authorUrl:string,
    likeCount:string,
]

interface DataExporterConfigType{
    filename?:string,
    noteElementFlagAttr?:string,
}

export default class DataExporter extends Base{

    private _countElement:HTMLDivElement;
    private _downloadBtn:HTMLButtonElement;

    private _data:RowType[] = [];

    // 创建一个Set，用于存储已提取的笔记链接
    private _extractedLinks = new Set<string>();
    private _count = 0;


    constructor(config:DataExporterConfigType){
        super();
        const noteElementFlagAttr = config.noteElementFlagAttr?config.noteElementFlagAttr:'data-v-12cf638b';
        const filename = config.filename?config.filename:''
       //
       this._countElement = this._createCountElement();
       

       this._downloadBtn = this._creatDownloadBtn(this.getSearchKeyword());
       
        // 添加表头
       this._data.push(['笔记标题', '笔记链接', '作者', '作者链接', '点赞数']);
       // 第一次加载，提取笔记内容数据
       this._extractNoteData(noteElementFlagAttr);
       // 监听页面滚动事件，当加载更多内容时，提取更多数据
       window.addEventListener("scroll", ()=>{
           this._extractNoteData(noteElementFlagAttr);
       });
    }


    private _createCountElement = ()=>{
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

    private _creatDownloadBtn = (filename:string)=>{
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
            this._exportToCSV(this._data, filename);
        });
        document.body.appendChild(downloadBtn);
        return downloadBtn;
    }

    // 导出函数，将数据导出为CSV文件
    private _exportToCSV = (data:RowType[], filename:string)=>{
        // 删除第三行数据
        //data.splice(2, 1);
        // 添加BOM头以处理UTF-8编码
        const begin = "data:text/csv;charset=utf-8,\uFEFF";
        const content = data.map((row,i) => {
            const one =  row.join(",");
            // console.log(i,one);
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

    
     // 提取笔记内容数据
     private _extractNoteData = (noteElementFlagAttr:string) => {
        // const noteElements = document.querySelectorAll(`div[${noteElementFlagAttr}]`);
        const noteElements = document.querySelectorAll(`section.note-item > div`);
        noteElements.forEach((ele) => {
            this._extractOneNote(ele);   
        });
        // 更新当前采集数量的显示
        this._countElement.innerText = "已采集：" + this._count + "条";
    }

    private _extractOneNote = (ele:Element)=>{
        // 检查是否已提取过该笔记内容数据
        if(ele.classList.contains('extracted')){
            return;
        }
        // 提取标题和笔记链接
        const titleElement = ele.querySelector('a.title span') as HTMLSpanElement;
        let title = titleElement ? titleElement.innerText : '';
        // 把#号替换掉，防止csv导出错误
        title = title.replace(/#/g,'jin');
        title = title.replace(/,/g, 'douhao')
        const noteLink = titleElement ? 'https://www.xiaohongshu.com' + titleElement.closest('a.title')?.getAttribute('href') : '';
        if(this._extractedLinks.has(noteLink)){
            return;
        }
        // 提取作者和作者链接
        const authorElement = ele.querySelector('div.author-wrapper a.author') as HTMLAnchorElement;
        const authorSpanEle = authorElement.querySelector('span.name') as HTMLSpanElement;
        let author = authorElement ? authorSpanEle.innerText : '';
         // 把#号替换掉，防止csv导出错误
        author = author.replace(/#/g,'jin');
        author = author.replace(/,/g, 'douhao')
        const authorLink = authorElement ? 'https://www.xiaohongshu.com' + authorElement.getAttribute('href') : '';
        // 提取点赞数
        const likeElement = ele.querySelector('span.like-wrapper span.count') as HTMLSpanElement;
        let likeCountStr = likeElement ? likeElement.innerText : '';
        if(likeCountStr.endsWith('w')){
            const likeCount = parseFloat(likeCountStr.replace('w','')) * 10000;
            likeCountStr = likeCount +'';
        }
        // 将提取的数据添加到数组中
        this._data.push([title?title:'无', noteLink?noteLink:'无', author?author:'无', authorLink?authorLink:'无', likeCountStr]);
        // 将笔记链接添加到已提取的链接集合中
        this._extractedLinks.add(noteLink);
        // 标记为已提取
        ele.classList.add('extracted');
        // 增加计数器
        this._count++;
    }

   

}
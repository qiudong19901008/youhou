import Base from "./Base";

export interface BaseDataExporterConfigType{
    filename?:string,
    noteElementFlagAttr?:string,
}



export default abstract class BaseDataExporter extends Base{

    
    // 创建一个Set，用于存储已提取的笔记链接
    protected extractedLinks = new Set<string>();
    protected count = 0;
// '标题', '链接', '唯一标识', '封面', '作者名', '作者链接','作者唯一标识', '浏览量', '点赞数','播放时长','是否违规'
    constructor(){
        super();
        // 添加表头
        // this.rows.push(['标题', '链接', '唯一标识', '封面', '作者名', '作者链接','作者唯一标识', '浏览量', '点赞数','播放时长','是否违规']);
        // 第一次加载，提取笔记内容数据
        this._extractNoteData();
        // 监听页面滚动事件，当加载更多内容时，提取更多数据
        window.addEventListener("scroll", ()=>{
            this._extractNoteData();
        });
    }

    
    // 提取笔记内容数据
    private _extractNoteData = () => {
        const eles = this.getNoteElements();
        eles.forEach((ele) => {
            this._extractOneNote(ele);   
        });
        // 更新当前采集数量的显示
        this.countElement.innerText = "已采集：" + this.count + "条";
    }

    private _pureStr(str:string){
         // 把#号替换掉，防止csv导出错误
         const res = str.replace(/#/g,'jin')
         .replace(/,/g, 'douhao')
         .replace(/"/g, 'shuangyinhao')
         .replace(/'/g,'danyinhao');
         return res;
    }

    // 提取一篇
    private _extractOneNote = (ele:Element)=>{
        // 检查是否已提取过该笔记内容数据
        if(ele.classList.contains('extracted')){
            return;
        }

        //文章主体
        const title = this._pureStr(this.getTitle(ele));
        const url = this.getUrl(ele);
        // 已提取过链接的不在重复提取，有是有一页会出现相同的两篇文章，就算元素标记了extracted还是会提取重复
        if(this.extractedLinks.has(url)){
            return;
        }
        const uniqueId = this.getUniqueId(ele);
        const thumbnail = this.getThumbnail(ele);
        //作者主体
        const authorName = this._pureStr(this.getAuthorName(ele));
        const authorUrl = this.getAuthorUrl(ele);
        const authorUniqueId = this.getAuthorUniqueId(ele);
        //作者meta
        const viewCountStr = this.getViewCountStr(ele);
        const likeCountStr = this.getLikeCountStr(ele);
        const durationSecondsStr = this.getDurationSecondsStr(ele);

        const illegal = this.getIllegal(ele);  

        // 将提取的数据添加到数组中
        this.rows.push({
            title,
            url,
            uniqueId:uniqueId !== '无'?`${uniqueId}a`:uniqueId,
            // uniqueId:uniqueId !== '无'?`${uniqueId}\t`:uniqueId,
            thumbnail,

            authorName,
            authorUrl,
            authorUniqueId:authorUniqueId !== '无'?`${authorUniqueId}a`:authorUniqueId,
            // authorUniqueId:authorUniqueId !== '无'?`${authorUniqueId}\t`:authorUniqueId,

            viewCountStr,
            likeCountStr,
            durationSecondsStr,

            illegal,
        });
        // 将笔记链接添加到已提取的链接集合中
        this.extractedLinks.add(url);
        // 标记为已提取
        ele.classList.add('extracted');
        // 增加计数器
        this.count++;
    }


    protected abstract getNoteElements():NodeListOf<Element>;

    protected abstract getTitle(ele:Element):string;
    protected abstract getUrl(ele:Element):string;
    protected abstract getUniqueId(ele:Element):string;
    protected abstract getThumbnail(ele:Element):string;

    protected abstract getAuthorName(ele:Element):string;
    protected abstract getAuthorUrl(ele:Element):string;
    protected abstract getAuthorUniqueId(ele:Element):string;

    protected abstract getViewCountStr(ele:Element):string;
    protected abstract getLikeCountStr(ele:Element):string;
    protected abstract getDurationSecondsStr(ele:Element):string;
    
    protected abstract getIllegal(ele:Element):string;



    

}
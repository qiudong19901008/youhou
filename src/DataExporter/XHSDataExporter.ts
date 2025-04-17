


import BaseDataExporter from "./BaseDataExporter";
import NoteDataGetter from "./NoteDataGetter";
import { XHSNoteDataType } from "./NoteDataGetter/XHSNoteDataGetter";


interface XHSNoteDataMapType{
    [uniqueId:string]:XHSNoteDataType,
}


export default class XHSDataExporter extends BaseDataExporter{

    protected tryGetSearchPageSearchKeywords(){
        const keywordInputEle = document.querySelector('#search-input') as HTMLInputElement|null;
        if (!keywordInputEle) {
            return '';
        }
        return keywordInputEle.value.trim();
    };
    protected tryGetAuthorPageAuthorName(){
        let res:string = '';
        const authorNameDiv = document.querySelector('#userPageContainer .user-name') as HTMLDivElement|null;
        if (authorNameDiv) {
            console.log(authorNameDiv.textContent)
            res = authorNameDiv.textContent?authorNameDiv.textContent.trim():'';            
        }
        return res;
    }

    protected getDefaultDownloadFilename(){
        return '小红书数据'
    }

    
    // 创建一个Set，用于存储已提取的笔记链接
    private _dataMap:XHSNoteDataMapType = {};
    // protected count = 0;
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

    private _getCollectedCount(){
        // this._dataMap
        const res = Object.keys(this._dataMap).length;
        return res;
    }
    
    // 提取笔记内容数据
    private _extractNoteData = () => {
        const eles = this.getNoteElements();
        eles.forEach((ele) => {
            this._extractOneNote(ele);   
        });
        // 更新当前采集数量的显示
        this.countElement.innerText = "已采集：" + this._getCollectedCount() + "条";
    }

    private _update

    // 提取一篇
    private _extractOneNote = (ele:Element)=>{
        // 检查是否已提取过该笔记内容数据
        if(ele.classList.contains('extracted')){
            return;
        }
        const data = NoteDataGetter.getXHSNoteData(ele);
        // 已提取过链接的不在重复提取，有时有一页会出现相同的两篇文章，就算元素标记了extracted还是会提取重复
        if(this.extractedLinks.has(data.url)){
            return;
        }

      
        // 将提取的数据添加到数组中
        // this.rows.push({
        //     title,
        //     url:url+'',
        //     uniqueId:uniqueId !== '无'?`${uniqueId}a`:uniqueId,
        //     thumbnail,

        //     authorName,
        //     authorUrl,
        //     authorUniqueId:authorUniqueId !== '无'?`${authorUniqueId}a`:authorUniqueId,

        //     viewCountStr,
        //     likeCountStr,
        //     durationSecondsStr,

        //     illegal,

        //     param1:param1 !== '无'?`${param1}a`:param1,
        // });
        // 将笔记链接添加到已提取的链接集合中
        this.extractedLinks.add(url);
        // 标记为已提取
        ele.classList.add('extracted');
        // 增加计数器
        this.count++;
    }


    protected abstract getNoteElements():NodeListOf<Element>;

    



    

}
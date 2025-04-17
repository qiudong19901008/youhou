import BaseDataCollector from "./BaseDataCollector";
import NoteDataGetter from "./NoteDataGetter";
import { XHSNoteDataType } from "./NoteDataGetter/XHSNoteDataGetter";


interface XHSNoteDataMapType{
    [uniqueId:string]:XHSNoteDataType,
}


export default class XHSDataCollector extends BaseDataCollector<XHSNoteDataType>{
    

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

        
    protected getNotes(){
        const res = Object.values(this._dataMap);
        return res;
    }

    protected getNoteElements(){
        const res = document.querySelectorAll(`section.note-item > div`);
        return res;
    }


    private _dataMap:XHSNoteDataMapType = {};

    constructor(){
        super();
        // 第一次加载，提取笔记内容数据
        this._extractNotesData();
        // 监听页面滚动事件，当加载更多内容时，提取更多数据
        window.addEventListener("scroll", ()=>{
            this._extractNotesData();
        });
    }

    private _getCollectedCount(){
        const res = Object.keys(this._dataMap).length;
        return res;
    }
    
    // 提取笔记内容数据
    private _extractNotesData = () => {
        const eles = this.getNoteElements();
        eles.forEach((ele) => {
            const data = NoteDataGetter.getXHSNoteData(ele);
            if(this._isNoteExtracted(ele,data)){
                return;
            }
            this._dataMap[data.uniqueId] = data;
            // 标记为已提取 并更新数量
            ele.classList.add('extracted'); 
            this.dataCountEle.updateCountData(this._getCollectedCount())
        });
    }

    private _isNoteExtracted(ele:Element,data:XHSNoteDataType){
        // 检查是否已提取过该笔记内容数据
        if(ele.classList.contains('extracted')){
            return true;
        }
        // 已提取过链接的不在重复提取，有时有一页会出现相同的两篇文章，就算元素标记了extracted还是会提取重复
        if(this._dataMap[data.uniqueId]){
            return true;
        }
    }

    



    



    

}
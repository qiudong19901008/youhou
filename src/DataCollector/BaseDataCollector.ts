import DataCountEle from "./components/DataCountEle";
import DataDownloadBtn from "./components/DataDownloadBtn";
import Helper from "../lib/Helper";
import { BaseNoteDataType } from "./NoteDataGetter/BaseNoteDataGetter";


export interface NoteDataMapType<T extends BaseNoteDataType>{
    [uniqueId:string]:T,
}

export default abstract class BaseDataCollector<T extends BaseNoteDataType>{

    protected dataCountEle:DataCountEle;
    protected dataDownloadBtn:DataDownloadBtn;
    protected dataMap:NoteDataMapType<T> = {};

    constructor(){
        this.dataCountEle = DataCountEle.getInstance();
        this.dataDownloadBtn = DataDownloadBtn.getInstance(this._handleDownloadNotes);
        // 第一次加载，提取笔记内容数据
        this._extractNotesData();
        // 监听页面滚动事件，当加载更多内容时，提取更多数据
        window.addEventListener("scroll", ()=>{
            this._extractNotesData();
        });
    }


    protected abstract tryGetSearchPageSearchKeywords():string;
    protected abstract tryGetAuthorPageAuthorName():string;
    protected abstract getDefaultDownloadFilename():string;

    protected abstract getNoteElements():NodeListOf<Element>;
    protected abstract getNoteElementData(ele:Element):T;
    protected abstract isValidNoteData(data:T):boolean;

    private _getDownloadFilename(){
        let res = this.tryGetSearchPageSearchKeywords();
        if(!res){
            res = this.tryGetAuthorPageAuthorName();
        }
        return res?res:this.getDefaultDownloadFilename();
    }

    private _handleDownloadNotes = ()=>{
        const fn = this._getDownloadFilename();
        const notes = this._getNotes();
        const res = notes.map((val)=>{
            delete val.uniqueId;
            return val;
        })
        Helper.downloadNotes(res,fn);
    }

    private _getCollectedCount(){
        const res = Object.keys(this.dataMap).length;
        return res;
    }
    
    protected _getNotes(){
        const res = Object.values(this.dataMap);
        return res;
    }

    // 提取笔记内容数据
    private _extractNotesData = () => {
        const eles = this.getNoteElements();
        eles.forEach((ele) => {
            const data = this.getNoteElementData(ele);
            
            if(this._isNoteExtracted(ele,data)){
                return;
            }

            if(!this.isValidNoteData(data)){
                return; 
            }

            this.dataMap[data.uniqueId] = data;
            // 标记为已提取 并更新数量
            ele.classList.add('extracted'); 
            this.dataCountEle.updateCountData(this._getCollectedCount())
        });
    }

    private _isNoteExtracted(ele:Element,data:T){
        // 检查是否已提取过该笔记内容数据
        if(ele.classList.contains('extracted')){
            return true;
        }
        // 已提取过链接的不在重复提取，有时有一页会出现相同的两篇文章，就算元素标记了extracted还是会提取重复
        if(this.dataMap[data.uniqueId]){
            return true;
        }
    }
    



}
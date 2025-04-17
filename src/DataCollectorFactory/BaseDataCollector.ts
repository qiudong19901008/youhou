import DataCountEle from "../components/DataCountEle";
import DataDownloadBtn from "../components/DataDownloadBtn";
import Helper from "../lib/Helper";
import { BaseNoteDataType } from "./NoteDataGetter/BaseNoteDataGetter";



export default abstract class BaseDataCollector<T extends BaseNoteDataType>{

    protected dataCountEle:DataCountEle;
    protected dataDownloadBtn:DataDownloadBtn;

    constructor(){
        this.dataCountEle = DataCountEle.getInstance();
        this.dataDownloadBtn = DataDownloadBtn.getInstance(this._handleDownloadNotes);
    }

    protected abstract tryGetSearchPageSearchKeywords():string;
    protected abstract tryGetAuthorPageAuthorName():string;
    protected abstract getDefaultDownloadFilename():string;

    protected abstract getNoteElements():NodeListOf<Element>;

    protected abstract getNotes():T[];

    private _getDownloadFilename(){
        let res = this.tryGetSearchPageSearchKeywords();
        if(!res){
            res = this.tryGetAuthorPageAuthorName();
        }
        return res?res:this.getDefaultDownloadFilename();
    }

    private _handleDownloadNotes = ()=>{
        const fn = this._getDownloadFilename();
        Helper.downloadNotes(this.getNotes(),fn);
    }

    



}
import BaseDataCollector from "./BaseDataCollector";
import XHSNoteDataGetter,{ XHSNoteDataType } from "./NoteDataGetter/XHSNoteDataGetter";




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

    
    protected getNoteElements(){
        const res = document.querySelectorAll(`section.note-item > div`);
        return res;
    }

    protected getNoteElementData(ele:Element): XHSNoteDataType {
        return XHSNoteDataGetter.run(ele);
    }

    protected isValidNoteData(data:XHSNoteDataType): boolean {
        if(data.标题 === '无'){
            return false;
        }
        if(parseInt(data.点赞数) < 200){
            return false;
        }
        return true;
    }


    

}
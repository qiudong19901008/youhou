import Base, { BaseDataExporterConfigType } from "./BaseDataExporter";

interface XHSDataExporterConfigType extends BaseDataExporterConfigType{
   
}

export default class XHSDataExporter extends Base{
  
    

    constructor(){
        super();      
    }

    // 第一部分
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

    // 第二部分
    protected getNoteElements(){
        const res = document.querySelectorAll(`section.note-item > div`);
        return res;
    }
    protected getTitle(ele:Element){
        // 提取标题和笔记链接
        // const titleElement = ele.querySelector('a.title span') as HTMLSpanElement;
        const titleElement = ele.querySelector('.footer a.title span') as HTMLSpanElement;
        let title = titleElement ? titleElement.innerText : '';
        return title;
    }

    protected getUrl(ele:Element){
        const titleElement = ele.querySelector('.footer a.title span') as HTMLSpanElement;
        const url = titleElement ? 'https://www.xiaohongshu.com' + ele.querySelector('a')?.getAttribute('href'):'';
        return url;
    }

    protected getAuthorName(ele:Element){
        // 提取作者和作者链接
        const authorElement = ele.querySelector('.footer div.author-wrapper a.author') as HTMLAnchorElement;

        if(!authorElement){
            return '未知';
        }

        const authorSpanEle = authorElement.querySelector('span.name') as HTMLSpanElement;
        let author = authorElement ? authorSpanEle.innerText : '';
        return author;
    }

    protected getAuthorUrl(ele:Element){
        const authorElement = ele.querySelector('.footer div.author-wrapper a.author') as HTMLAnchorElement;
        const authorLink = authorElement ? 'https://www.xiaohongshu.com' + authorElement.getAttribute('href') : '';
        return authorLink;
    }

    protected getLikeCountStr(ele:Element){
        const likeElement = ele.querySelector('span.like-wrapper span.count') as HTMLSpanElement;
        let likeCountStr = likeElement ? likeElement.innerText : '';
        if(likeCountStr.endsWith('w')){
            const likeCount = parseFloat(likeCountStr.replace('w','')) * 10000;
            likeCountStr = likeCount +'';
        }
        if(likeCountStr.endsWith('万')){
            const likeCount = parseFloat(likeCountStr.replace('万','')) * 10000;
            likeCountStr = likeCount +'';
        }
        if(likeCountStr === '赞'){
            likeCountStr = '0';
        }
        return likeCountStr;
    }

    protected getIllegal(ele:Element){
        let illegal = '否';
        const tagArea = ele.querySelector('.bottom-tag-area');
        if(tagArea && tagArea.innerHTML.includes('违规')){
            illegal = '是'
        }
        return illegal;
    }

    protected getDurationSecondsStr(ele: Element): string {
        return '0';
    }
   

}
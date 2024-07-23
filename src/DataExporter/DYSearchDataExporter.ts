import Base, { BaseDataExporterConfigType } from "./BaseDataExporter";



export default class DYSearchDataExporter extends Base{
    

    constructor(){
        super();      
    }
// data-e2e="searchbar-input"
    // 第一部分
    protected tryGetSearchPageSearchKeywords(){
        const keywordInputEle = document.querySelector('#douyin-header input[data-e2e="searchbar-input"]') as HTMLInputElement|null;
        if (!keywordInputEle) {
            return '';
        }
        return keywordInputEle.value.trim();
    };
    protected tryGetAuthorPageAuthorName(){
        return '';
    }

    protected getDefaultDownloadFilename(){
        return '抖音搜索数据'
    }

    // 第二部分
    protected getNoteElements(){
        const res = document.querySelectorAll(`#search-content-area ul[data-e2e="scroll-list"] > li`);
        return res;
    }
    protected getTitle(ele:Element){
        // 提取标题和笔记链接
        // const titleElement = ele.querySelector('a > div >') as HTMLSpanElement;
        // let title = titleElement ? titleElement.innerText : '';
        // return title;
        return ''
    }

    protected getUrl(ele:Element){
        const aLink = ele.querySelector('a') as HTMLSpanElement;
        if(!aLink){
            return '';
        }
        const url = aLink.getAttribute('href');
        return url?url:'';
    }

    protected getAuthorName(ele:Element){
        // 提取作者和作者链接
        // const authorElement = ele.querySelector('.footer div.author-wrapper a.author') as HTMLAnchorElement;

        // if(!authorElement){
        //     return '未知';
        // }

        // const authorSpanEle = authorElement.querySelector('span.name') as HTMLSpanElement;
        // let author = authorElement ? authorSpanEle.innerText : '';
        // return author;
        return ''
    }

    protected getAuthorUrl(ele:Element){
        // const authorElement = ele.querySelector('.footer div.author-wrapper a.author') as HTMLAnchorElement;
        // const authorLink = authorElement ? 'https://www.xiaohongshu.com' + authorElement.getAttribute('href') : '';
        // return authorLink;
        return ''
    }

    protected getLikeCountStr(ele:Element){
        // const likeElement = ele.querySelector('span.like-wrapper span.count') as HTMLSpanElement;
        // let likeCountStr = likeElement ? likeElement.innerText : '';
        // if(likeCountStr.endsWith('w')){
        //     const likeCount = parseFloat(likeCountStr.replace('w','')) * 10000;
        //     likeCountStr = likeCount +'';
        // }
        // if(likeCountStr.endsWith('万')){
        //     const likeCount = parseFloat(likeCountStr.replace('万','')) * 10000;
        //     likeCountStr = likeCount +'';
        // }
        // if(likeCountStr === '赞'){
        //     likeCountStr = '0';
        // }
        // return likeCountStr;
        return '0'
    }

    protected getIllegal(ele:Element){
        // let illegal = '否';
        // const tagArea = ele.querySelector('.bottom-tag-area');
        // if(tagArea && tagArea.innerHTML.includes('违规')){
        //     illegal = '是'
        // }
        // return illegal;
        return '否'
    }
   

}
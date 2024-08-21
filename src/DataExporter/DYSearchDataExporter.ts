import Base, { BaseDataExporterConfigType } from "./BaseDataExporter";



export default class DYSearchDataExporter extends Base{
    
    

    constructor(){
        super();      
    }

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
        // 提取标题
        const titleElement = ele.querySelector('a > div > div:nth-child(2) > div > div:nth-child(1)') as HTMLElement;
        let title = titleElement ? titleElement.innerText : '无';
        return title;
    }

    protected getUrl(ele:Element){
        const aLink = ele.querySelector('a') as HTMLSpanElement;
        if(!aLink){
            return '无';
        }
        const url = aLink.getAttribute('href');
        return url?url:'无';
    }

    protected getUniqueId(ele: Element): string {
        const url = this.getUrl(ele);
        if(url === '无'){
            return url;
        }
        // https://www.douyin.com/video/7397690011128253736
        const arr = url.split('/');
        return arr[arr.length-1]
    }

    protected getThumbnail(ele:Element){
        return '无';
    }

    protected getAuthorName(ele:Element){
        // 提取作者和作者链接
        const authorElement = ele.querySelector('a > div > div:nth-child(2) > div > div:nth-child(2) > span:nth-child(1) > span:nth-child(2)') as HTMLElement;

        if(!authorElement){
            return '无';
        }
        let author = authorElement ? authorElement.innerText : '无';
        return author;
    }

    protected getAuthorUrl(ele:Element){
        // const authorElement = ele.querySelector('.footer div.author-wrapper a.author') as HTMLAnchorElement;
        // const authorLink = authorElement ? 'https://www.xiaohongshu.com' + authorElement.getAttribute('href') : '';
        // return authorLink;
        return '无'
    }

    protected getAuthorUniqueId(ele: Element): string {
        return '无';
    }

    


    protected getViewCountStr(ele:Element){
        return '0';
    }
   

    protected getLikeCountStr(ele:Element){

        const likeElement = ele.querySelector('a > div > div.videoImage > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > span') as HTMLSpanElement;
        let likeCountStr = likeElement ? likeElement.innerText : '';
        if(likeCountStr.endsWith('w')){
            const likeCount = parseFloat(likeCountStr.replace('w','')) * 10000;
            likeCountStr = likeCount +'';
        }
        if(likeCountStr.endsWith('万')){
            const likeCount = parseFloat(likeCountStr.replace('万','')) * 10000;
            likeCountStr = likeCount +'';
        }
        if(likeCountStr === '赞' || !likeCountStr){
            likeCountStr = '0';
        }
        return likeCountStr;
    }

    protected getDurationSecondsStr(ele:Element){
        const durationEle = ele.querySelector('a > div > div.videoImage > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)') as HTMLSpanElement;
        if(!durationEle){
            return '0'
        }
        const mmss = durationEle.innerHTML;
        const arr = mmss.split(':');
        if(arr.length !== 2){
            return '0';
        }
        const seconds = parseInt(arr[0])*60 + parseInt(arr[1]);
        return seconds + '';    
    }

    protected getIllegal(ele:Element){
        return '否'
    }

    


}
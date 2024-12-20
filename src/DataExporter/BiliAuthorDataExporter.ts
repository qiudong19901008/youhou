import { f_jointMultiplePath } from "../lib/functions";
import BaseDataExporter, { BaseDataExporterConfigType } from "./BaseDataExporter";



export default class BiliAuthorDataExporter extends BaseDataExporter{

    

    constructor(){
        super();      
    }

    protected getExportToCsvType(): "my" | "export-to-csv" {
        return 'export-to-csv';
        // return 'my'
    }

    // 第一部分
    protected tryGetSearchPageSearchKeywords(){
        return '';
        // const keywordInputEle = document.querySelector('.search-header input.search-input-el') as HTMLInputElement|null;
        // if (!keywordInputEle) {
        //     return '';
        // }
        // return keywordInputEle.value.trim();
    };
    protected tryGetAuthorPageAuthorName(){
        // h-name
        const nameEle = document.querySelector('#h-name') as HTMLSpanElement;
        if(!nameEle){
            return '';
        }
        // console.log()
        return nameEle.innerHTML;
    }

    protected getDefaultDownloadFilename(){
        return 'B站作者'
    }

    // 第二部分
    protected getNoteElements(){
        const res = document.querySelectorAll(`#submit-video-list ul.cube-list li`);
        return res;
    }

    protected getTitle(ele:Element){
        // 提取标题
        const titleElement = ele.querySelector('a.title') as HTMLElement;
        if(!titleElement){
            return '无';
        }
        const title = titleElement.getAttribute('title')
        return title;
    }

    protected getUrl(ele:Element){
        const aEle = ele.querySelector('a.title') as HTMLElement;
        if(!aEle){
            return '无';
        }
        let url = aEle.getAttribute('href');
        if(!url){
            return '无';
        }
        // if(url.startsWith('//www.')){
        //     // url = url.substring(6);
        //     url = '/'
        // }
        return url;
    }

    protected getUniqueId(ele: Element): string {
        const url = this.getUrl(ele);
        if(url === '无'){
            return url;
        }
        // https://www.bilibili.com/video/BV1LmWpeCEUX/
        const arr = url.split('/');
        return arr[arr.length-2]
    }

    protected getThumbnail(ele:Element){
        const imgEle = ele.querySelector('a.cover img') as HTMLImageElement;
        if(!imgEle){
            return '无';
        }
        const src = imgEle.getAttribute('src');
        const srcArr = src.split('@');
        if(srcArr[0]){
            return srcArr[0];
        }
        return '无';
    }


    protected getAuthorName(ele:Element){
        const  nameEle = document.querySelector('#h-name') as HTMLSpanElement;
        if(!nameEle){
            return '无';
        }
        return nameEle.innerHTML;
    }

    protected getAuthorUrl(ele:Element){
        const origin = window.location.origin;
        const pathname = window.location.pathname;
        // /3493130005383323/video /3493130005383323
        const uniqueId = pathname.split('/')[1];
        if(!uniqueId){
            return '无';
        }
        return f_jointMultiplePath(origin.replace('https:',''),uniqueId);
        // const authorElement = ele.querySelector('.bili-video-card__info--owner') as HTMLAnchorElement;
        // if(!authorElement){
        //     return '无';
        // }
        // const res = authorElement.getAttribute('href');
        // return res
    }

    protected getAuthorUniqueId(ele: Element): string {
        const pathname = window.location.pathname;
        // /3493130005383323/video /3493130005383323
        const uniqueId = pathname.split('/')[1];
        if(!uniqueId){
            return '无';
        }
        return uniqueId;
    }

    protected getViewCountStr(ele:Element){
        const viewCountEle = ele.querySelector('div.meta .play span') as HTMLSpanElement;
        let viewCountStr = viewCountEle ? viewCountEle.innerText : '';
        // if(likeCountStr.endsWith('w')){
        //     const likeCount = parseFloat(likeCountStr.replace('w','')) * 10000;
        //     likeCountStr = likeCount +'';
        // }
        if(viewCountStr.endsWith('万')){
            const viewCount = parseFloat(viewCountStr.replace('万','')) * 10000;
            viewCountStr = viewCount +'';
        }
        // if(likeCountStr === '赞' || !likeCountStr){
        //     likeCountStr = '0';
        // }
        return viewCountStr;
    }

    protected getLikeCountStr(ele:Element){
        return '0';
        // const likeElement = ele.querySelector('a > div > div.videoImage > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > span') as HTMLSpanElement;
        // let likeCountStr = likeElement ? likeElement.innerText : '';
        // if(likeCountStr.endsWith('w')){
        //     const likeCount = parseFloat(likeCountStr.replace('w','')) * 10000;
        //     likeCountStr = likeCount +'';
        // }
        // if(likeCountStr.endsWith('万')){
        //     const likeCount = parseFloat(likeCountStr.replace('万','')) * 10000;
        //     likeCountStr = likeCount +'';
        // }
        // if(likeCountStr === '赞' || !likeCountStr){
        //     likeCountStr = '0';
        // }
        // return likeCountStr;
    }

    protected getDurationSecondsStr(ele:Element){
        const durationEle = ele.querySelector('a.cover .length') as HTMLSpanElement;
        if(!durationEle){
            return '0'
        }
        const mmss = durationEle.innerHTML;
        const arr = mmss.split(':');
        let seconds = 0;
        if(arr.length === 3){
            seconds = parseInt(arr[0])*60*60 + parseInt(arr[1])*60 + parseInt(arr[2]);
        }
        if(arr.length === 2){
            seconds = parseInt(arr[0])*60 + parseInt(arr[1]);
        }
        return seconds + '';    
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

    

    protected getParam1(ele: Element): string {
        return '无';
    }
    
    

    
   

}
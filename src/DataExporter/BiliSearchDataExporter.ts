import Base, { BaseDataExporterConfigType } from "./BaseDataExporter";



export default class BiliSearchDataExporter extends Base{
    

    constructor(){
        super();      
    }

    // 第一部分
    protected tryGetSearchPageSearchKeywords(){
        // #i_cecream > div > div:nth-child(2) > div.search-header > div.search-input > div > div > div > input
        const keywordInputEle = document.querySelector('.search-header input.search-input-el') as HTMLInputElement|null;
        if (!keywordInputEle) {
            return '';
        }
        return keywordInputEle.value.trim();
    };
    protected tryGetAuthorPageAuthorName(){
        return '';
    }

    protected getDefaultDownloadFilename(){
        return 'B站搜索数据'
    }

    // 第二部分
    protected getNoteElements(){
        const res = document.querySelectorAll(`div.video-list > div > div.bili-video-card`);
        return res;
    }
    protected getTitle(ele:Element){
        // 提取标题
        // div.bili-video-card__wrap.__scale-wrap > div > div > a > h3
        const titleElement = ele.querySelector('div.bili-video-card__wrap.__scale-wrap h3') as HTMLElement;
        if(!titleElement){
            return '';
        }
        const title = titleElement.getAttribute('title')
        return title;
    }

    protected getUrl(ele:Element){
        const aEle = ele.querySelector('div.bili-video-card__wrap.__scale-wrap > a') as HTMLAnchorElement;
        if(!aEle){
            return '';
        }
        const url = aEle.getAttribute('href');
        if(!url){
            return '';
        }
        return url;
        // const arr = url.split('/');
        // return arr[arr.length-2]
        // return url;
        // return `https:${url.substring(0,url.length-1)}`
    }

    protected getAuthorName(ele:Element){
        // 提取作者和作者链接
        const authorElement = ele.querySelector('.bili-video-card__info--owner .bili-video-card__info--author') as HTMLSpanElement;
        if(!authorElement){
            return '未知';
        }
        let authorName = authorElement.innerHTML;
        return authorName;
    }

    protected getAuthorUrl(ele:Element){
        const authorElement = ele.querySelector('.bili-video-card__info--owner') as HTMLAnchorElement;
        if(!authorElement){
            return '';
        }
        const res = authorElement.getAttribute('href');
        return res
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

    protected getIllegal(ele:Element){
        // let illegal = '否';
        // const tagArea = ele.querySelector('.bottom-tag-area');
        // if(tagArea && tagArea.innerHTML.includes('违规')){
        //     illegal = '是'
        // }
        // return illegal;
        return '否'
    }

    protected getDurationSecondsStr(ele:Element){
        const durationEle = ele.querySelector('.bili-video-card__stats__duration') as HTMLSpanElement;
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

    protected getThumbnail(ele:Element){
        // return ''
        const imgEle = ele.querySelector('.bili-video-card__cover img') as HTMLImageElement;
        if(!imgEle){
            return '';
        }
        const src = imgEle.getAttribute('src');
        const srcArr = src.split('@');
        if(srcArr[0]){
            return srcArr[0];
        }
        return '';

        
    }

    protected getViewCountStr(ele:Element){
        const viewCountEle = ele.querySelector('.bili-video-card__stats--left .bili-video-card__stats--item:nth-child(1) span') as HTMLSpanElement;
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
   

}
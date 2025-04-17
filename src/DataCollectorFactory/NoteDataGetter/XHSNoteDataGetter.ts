import { f_getQueryVar } from "../../lib/functions";
import Base, { BaseNoteDataType } from "./BaseNoteDataGetter";

export interface XHSNoteDataType extends BaseNoteDataType{
    '点赞数':string,
    // xsec_token:string,
}

class XHSGetNoteData extends Base<XHSNoteDataType>{

    public run(ele:Element):XHSNoteDataType{
        const baseData = this.__getBaseNoteData(ele);
        return {
            ...baseData,
            点赞数:this._getLikeCountStr(ele),
            // xsec_token:this._get_xsec_token(ele),
        }
    }

    

    private _getLikeCountStr(ele:Element){
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

    // private _get_xsec_token(ele:Element){
    //     // 有标题则获取
    //     const coverAEle = ele.querySelector('a.cover') as HTMLLinkElement;
    //     if(!coverAEle){
    //         return '无';
    //     }
    //     // /search_result/675a9ae60000000006039462?xsec_token=ABui8cdN7qM5UtArao_qy0fvyLnsX8Z5e-zMEQD_bqf5k=&xsec_source=
    //     const href = coverAEle.getAttribute('href');
    //     const value = f_getQueryVar(href,'xsec_token');
    //     if(!value){
    //         return '无';
    //     }
    //     return value;
    // }

    protected getTitle(ele: Element): string {
       // 提取标题和笔记链接
        // const titleElement = ele.querySelector('a.title span') as HTMLSpanElement;
        const titleElement = ele.querySelector('.footer a.title span') as HTMLSpanElement;
        let title = titleElement ? titleElement.innerText : '无';
        return title;
    }
    
    protected getUrl(ele: Element): string {
        // 如果无标题则当做没有处理
        const aEle = ele.querySelector('a.cover') as HTMLLinkElement;
        if(!aEle){
            return '无'
        }
        // const url = 'https://www.xiaohongshu.com' + aEle.querySelector('a')?.getAttribute('href');
        const href = 'https://www.xiaohongshu.com' + aEle.getAttribute('href');
        return href;
    }
    protected getUniqueId(ele: Element): string {
        const url = this.getUrl(ele);
        if(url === '无'){
            return url;
        }
        // https://www.xiaohongshu.com/explore/66becb0d000000000503abd2?xxxx
        const pureUrl = url.split('?')[0];
        if(!pureUrl){
            return '无';
        }
        const arr = pureUrl.split('/');
        return arr[arr.length-1]
    }
    
    protected getThumbnail(ele: Element): string {
        const imageEle = ele.querySelector('a.cover > img') as HTMLImageElement;
        if(!imageEle){
            return '无';
        }
        const url = imageEle.getAttribute('src');
        if(url){
            // https://sns-webpic-qc.xhscdn.com/202408141010/b7fea120d4aa08edecf673e3281f0e95/1040g008315mv4jg01c605pgmcc2hojgfppdf9tg!nc_n_webp_mw_1
            const id = url.split("/")[5].split("!")[0]
            let pngUrl = `https://ci.xiaohongshu.com/${id}?imageView2/2/w/format/png`;
            return pngUrl;
        }        
        return '无';
    }
    protected getAuthorName(ele: Element) {
        // 提取作者和作者链接
        const authorElement = this._getAuthorElement(ele);

        if(!authorElement){
            return '无'
        }

        const authorSpanEle = authorElement.querySelector('span.name') as HTMLSpanElement;
        if(!authorSpanEle){
            return '无'
        }
        let authorName = authorSpanEle.innerText;
        return authorName;
    }
    protected getAuthorUrl(ele: Element): string {
        const authorElement = this._getAuthorElement(ele);
        if(!authorElement){
            return '无'
        }
        const authorLink = 'https://www.xiaohongshu.com' + authorElement.getAttribute('href').split('?')[0];
        return authorLink;
    }
    protected getAuthorUniqueId(ele: Element): string {
        const url = this.getAuthorUrl(ele);
        if(url === '无'){
            return url;
        }
        // https://www.xiaohongshu.com/user/profile/5fe40577000000000101f9fc
        const arr = url.split('/');
        return arr[arr.length-1]
    }
    protected getIllegal(ele: Element): string {
        let illegal = '否';
        const tagArea = ele.querySelector('.bottom-tag-area');
        if(tagArea && tagArea.innerHTML.includes('违规')){
            illegal = '是'
        }
        return illegal;
    }

    private _getAuthorElement(ele:Element){
        let res = ele.querySelector('.footer div.author-wrapper a.author') as HTMLAnchorElement;
        if(!res){
            res = ele.querySelector('.footer div.card-bottom-wrapper a.author') as HTMLAnchorElement;
        }
        return res;
    }



}

export default new XHSGetNoteData();
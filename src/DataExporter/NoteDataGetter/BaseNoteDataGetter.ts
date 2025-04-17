

export interface BaseNoteDataType{
    title:string,
    url:string,
    uniqueId:string,

    thumbnail:string,

    authorName:string,
    authorUrl:string,
    authorUniqueId:string,

    illegal:string,
}

export default abstract class BaseNoteDataGetter<T extends BaseNoteDataType>{

    public abstract run(ele:Element):T;

    protected abstract getTitle(ele:Element):string;
    protected abstract getUrl(ele:Element):string;
    protected abstract getUniqueId(ele:Element):string;

    protected abstract getThumbnail(ele:Element):string;

    protected abstract getAuthorName(ele:Element):string;
    protected abstract getAuthorUrl(ele:Element):string;
    protected abstract getAuthorUniqueId(ele:Element):string;

    protected abstract getIllegal(ele:Element):string;

    protected __pureStr(str:string){
        // 把#号替换掉，防止csv导出错误
        const res = str.replace(/#/g,'jin')
        .replace(/,/g, 'douhao')
        .replace(/"/g, 'shuangyinhao')
        .replace(/'/g,'danyinhao');
        return res;
   }

   protected __getBaseNoteData(ele:Element){
        // 文章主体
        const title = this.__pureStr(this.getTitle(ele));
        const url = this.getUrl(ele);
        const uniqueId = this.getUniqueId(ele);
        // 作者主体
        const authorName = this.__pureStr(this.getAuthorName(ele));
        const authorUrl = this.getAuthorUrl(ele);
        const authorUniqueId = this.getAuthorUniqueId(ele);

        // 其他
        const thumbnail = this.getThumbnail(ele);
        const illegal = this.getIllegal(ele);
        return {
            title,
            url,
            uniqueId,

            thumbnail,

            authorName,
            authorUrl,
            authorUniqueId,

            illegal,
        }
   }

}
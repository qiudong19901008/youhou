

export interface BaseNoteDataType{

    'uniqueId':string,

    '标题':string,
    '链接':string,
    '封面':string,

    '作者名':string,
    '作者主页':string,

    '是否违规':string,

    // uniqueId:string,
    // authorName:string,
    // authorUrl:string,
    // authorUniqueId:string,
    // illegal:string,
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
        const 标题 = this.__pureStr(this.getTitle(ele));
        const 链接 = this.getUrl(ele);
        const uniqueId = this.getUniqueId(ele);
        // 作者主体
        const 作者名 = this.__pureStr(this.getAuthorName(ele));
        const 作者主页 = this.getAuthorUrl(ele);
        const authorUniqueId = this.getAuthorUniqueId(ele);

        // 其他
        const 封面 = this.getThumbnail(ele);
        const 是否违规 = this.getIllegal(ele);
        return {

            uniqueId,

            标题,
            链接,
            封面,

            作者名,
            作者主页,

            是否违规,
        }
   }

}
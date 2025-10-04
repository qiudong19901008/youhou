import Helper from "../../lib/Helper";


export default class NoteDownloader{

    protected downloadBtn:HTMLButtonElement;

    constructor(){
        this.downloadBtn = this.creatDownloadBtn();
    }

    private _getSrcList(){
        const images = document.querySelectorAll('#noteContainer .swiper-wrapper > div.swiper-slide img');
        let srcList:string[] = [];
        images.forEach((img,i) => {
            const url = img.getAttribute('src');
            // if(url){
            //     const id = url.split("/")[5].split("!")[0]
            //     let pngUrl = `https://ci.xiaohongshu.com/${id}?imageView2/2/w/format/png`;
            //     srcList.push(pngUrl)
            // }
            if(url){
                srcList.push(url)
            }
        });
        if(srcList.length >=3){
            srcList = srcList.slice(1,srcList.length-1);
        }
        return srcList;
    }

    private _getTitle(){
        const title = document.querySelector('#detail-title')?.innerHTML;
        return title;
    }

    private _getDescription(){
        const description = document.querySelector('#detail-desc')?.innerHTML;
        return description;
    }

    protected creatDownloadBtn = ()=>{
        const downloadBtn = document.createElement("button");
        downloadBtn.id = "downloadNotBtn";
        downloadBtn.innerText = "下载NOTE";
        downloadBtn.style.position = "fixed";
        downloadBtn.style.bottom = "140px";
        downloadBtn.style.left = "20px";
        downloadBtn.style.zIndex = "9999";
        downloadBtn.style.backgroundColor = "#4CAF50";
        downloadBtn.style.color = "#fff";
        downloadBtn.style.border = "none";
        downloadBtn.style.borderRadius = "5px";
        downloadBtn.style.padding = "10px";
        downloadBtn.style.fontSize = "16px";
        downloadBtn.style.cursor = "pointer";
        downloadBtn.addEventListener("click", async () => {
            const title = this._getTitle();
            const description = this._getDescription();
            const srcList = this._getSrcList();
            // 
            try{
                downloadBtn.innerHTML = '下载中...'
                // Helper.downloadNotes()
                await Helper.downloadImageList(srcList,title);
                // await ImageListDownloader.run(srcList,title);
            }catch(e){
                alert('下载失败');
                throw e;
            }

            downloadBtn.innerHTML = '下载NOTE'
            
        });
        document.body.appendChild(downloadBtn);
        return downloadBtn;
    }

}
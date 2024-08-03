// 在JS文件中引入这两个插件
import JSZip from 'jszip'
import FileSaver from 'file-saver'


type ImageType = {name:string,base64:string}

class ImageListDownloader{

    /**
     * 获取图片的 base64 编码
     * @param image 图像对象
     * @return 返回base64编码
     */
    private _imgObjectToBase64(image:HTMLImageElement){
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, image.width, image.height)
        // 获取图片后缀名
        const extension = image.src
          .substring(image.src.lastIndexOf('.') + 1)
          .toLowerCase()
        // 某些图片 url 可能没有后缀名，默认是 png
        return canvas.toDataURL('image/' + extension, 1)
    }

    private async _getImageList(srcList:string[]){
        
        const res:ImageType[] = [];
        for (let i = 0; i < srcList.length; i++) {
            const base64 = await this._getImageBase64(srcList[i]);
            res.push({ name: (i+1)+'', base64 }) 
        }
        return res;
    }

    public async run(srcList:string[],fn:string){
        
        const images = await this._getImageList(srcList);
        const zip = new JSZip()
        const fileFolder = zip.folder(fn) // 创建 zipName 文件夹
        for(let image of images){
            fileFolder.file(image.name + '.png', image.base64, {base64: true})
        }
        zip.generateAsync({ type: 'blob' }).then(content => {
            FileSaver.saveAs(content, fn + '.zip')
        })
    }

    private async _getImageBase64(src:string){

        const res = new Promise<string>((resolve, reject) => {
            const image = new Image();
            image.setAttribute('crossOrigin', 'Anonymous') // 设置 crossOrigin 属性，解决图片跨域报错
            image.src = src;
            image.onload = async ()=>{
                const base64 = this._imgObjectToBase64(image);
                resolve(base64.substring(22));// 截取 data:image/png;base64, 后的数据
            }
            // 加载失败时
            image.onerror = function () {
                reject(new Error(`无法解析图片链接 ${src} `));
            };
        });
        return res;

        
    }   

}

export default new ImageListDownloader();

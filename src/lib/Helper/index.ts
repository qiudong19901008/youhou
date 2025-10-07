import { BaseNoteDataType } from "../../DataCollector/NoteDataGetter/BaseNoteDataGetter";
import ImageListDownloader from "./ImageListDownloader";
import * as XLSX from 'xlsx';


interface DownloadNotesParamsType<T extends BaseNoteDataType>{
    platformName:string,
    fn:string,
    dataArr:T[]
}


class Helper{

    public getQueryVar(url:string,name:string){
        const paramsStr = url.split('?')[1];
        if(!paramsStr){
            return false;
        }
        const vars = paramsStr.split("&");
        for (let i=0;i<vars.length;i++) {
            const pair = vars[i].split("=");
            if(pair[0] == name){
                return pair[1]
            }
        }
        return false;
    }

    public async downloadImageList(srcList: string[], fn: string){
        await ImageListDownloader.run(srcList,fn);
    }

    public showLoading(){
        const loading = document.getElementById('ajaxLoading') as HTMLElement ;
        loading.style.display = 'block';
    }

    public hideLoading(){
        const loading = document.getElementById('ajaxLoading') as HTMLElement ;
        loading.style.display = 'none';
    }

    public isVoid(value:any){
        if(value === undefined){
            return true;
        }
        if(value === null){
            return true;
        }
        if(value === ''){
            return true;
        }
        return false;
    }

    public isNotVoid(value:any){
        return !this.isVoid(value);
    }

    public jointMultiplePath(...pathArr:string[]){
         let finalPath='';
        // 过滤 undefined null 
        pathArr = pathArr.filter((path)=>{
            return this.isNotVoid(path)
        })

        //去除所有 /
        for(let i=0,size=pathArr.length;i<size;i++){
            let path = pathArr[i];
            const firstChar = path.charAt(0);
            if(i!==0 && firstChar === '/'){
            path = path.substring(1,path.length);
            }
            const lastChar = path.charAt(path.length-1);
            if(i!==size-1 && lastChar === '/'){
            path = path.substring(0,path.length-1);
            }
            finalPath+=path+'/';
        }
        return finalPath.substring(0,finalPath.length-1);
    }

    public downloadNotes<T extends BaseNoteDataType>(params:DownloadNotesParamsType<T>){

        const {
            fn,
            platformName,
            dataArr,
        } = params;

        // 创建 Workbook 对象
        const workbook = XLSX.utils.book_new();
        
        // 创建 Worksheet 对象
        let worksheet = XLSX.utils.aoa_to_sheet([
            [platformName]
        ])

        // Worksheet从第2行开始添加数据
        XLSX.utils.sheet_add_json(worksheet,dataArr,{origin:1});

        // 将 Worksheet 添加到 Workbook 中
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        
        XLSX.writeFile(workbook, `${fn}.xlsx`);

    }



}
export default new Helper();
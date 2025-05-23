import { FuncType } from "../../lib/types";



export default class DataDownloadBtn{

    private static _instance:DataDownloadBtn;

    // private _exporter:DataToCsvExporter;
    private _btn:HTMLButtonElement;

    public static getInstance(func:FuncType){
        if(this._instance){
            return this._instance;
        }
        this._instance = new DataDownloadBtn(func);
        return this._instance;
    }

    protected constructor(func:FuncType){
        this._btn = this._getDownloadDataBtn();

        this._btn.addEventListener("click", () => {
            func();
            // Helper.downloadNotes([],'11')
        });

        document.body.appendChild(this._btn);
    }


    private _getDownloadDataBtn(){
        const downloadBtn = document.createElement("button");
        downloadBtn.id = 'downloadDataBtn';
        downloadBtn.innerText = "下载数据";
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
        return downloadBtn;
    }

}


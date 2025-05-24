

export default class DataCountEle{

    private static _instance:DataCountEle;
    private _btn:HTMLDivElement;

    public static getInstance(){
        if(this._instance){
            return this._instance;
        }
        this._instance = new DataCountEle();
        return this._instance;
    }

    protected constructor(){
        this._btn = this._getCountDataEle();
        this._btn.innerText = `已采集：0 条`;
        document.body.appendChild(this._btn);
    }

    public updateCountData(count:number){
        this._btn.innerText = `已采集：${count} 条`;
    }

    private _getCountDataEle(){
        const countElement = document.createElement("div");
        countElement.style.position = "fixed";
        countElement.style.bottom = "100px";
        countElement.style.left = "20px";
        countElement.style.zIndex = "9999";
        countElement.style.backgroundColor = "#fff";
        countElement.style.padding = "10px";
        countElement.style.borderRadius = "5px";
        countElement.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
        countElement.style.fontWeight = "bold";
        countElement.style.fontSize = "16px";
        countElement.style.color = "#333";
        return countElement;
    }

}

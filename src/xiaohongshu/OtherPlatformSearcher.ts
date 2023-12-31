import Base from "./Base";


interface SearchEngineType{
    name:string,
    url:string,
}


export default class OtherPlatformSearcher extends Base{

    private _searchEngines:SearchEngineType[] = [
        {name: "搜百度", url: "https://www.baidu.com/s?wd=" },
        {name: "搜知乎", url:"https://www.zhihu.com/search?type=content&q=" },
        {name: "搜抖音", url: "https://www.douyin.com/search/" },
        {name: "搜公号", url: "https://weixin.sogou.com/weixin?type=2&query=" }
        // 添加其他搜索引擎的数据，格式为 { name: "搜索引擎名称", url: "搜索引擎链接" }
    ];

    constructor(){
        super();
        const channelList = document.querySelector(".channel-list");
        if(!channelList){
            return;
        }
        this._createStyleEle();
        this._createButtons();
    }

    // 获取搜索关键词
    // private _getSearchKeyword = ()=> {
    //     var keywordInput = document.querySelector('.input-box input.search-input') as HTMLInputElement|null;
    //     if (!keywordInput) {
    //         return '';
    //     }
    //     return keywordInput.value.trim();
    // }

    private _createStyleEle = ()=>{
        // 添加搜索按钮样式
        var styleElement = document.createElement("style");
        styleElement.textContent = ` .search-engine-buttons { display: flex; flex-wrap: wrap; justify-content: space-between; margin-top: 10px; } .search-engine-button { display: inline-block; width: calc(50% - 10px); padding: 10px; background-color: #4caf50; border-radius: 8px; color: #fff !important; font-size: 18px; text-align: center; text-decoration: none; cursor: pointer; transition: background-color 0.2s; margin-bottom: 0px; } .search-engine-button.large-button { padding: 10px; } .search-engine-button.bottom-row { margin-top: 5px; } .search-engine-button:hover { background-color: #365843; }`;
        document.head.appendChild(styleElement);
    }

    private _createButtons = ()=>{
        const buttonsWrapper = document.createElement("div");
        buttonsWrapper.className = "search-engine-buttons";
        // 查找目标位置的父节点
        const parentElement = document.querySelector(".bottom-channel");
        if (parentElement) {
            parentElement.parentNode?.insertBefore(buttonsWrapper, parentElement.nextSibling);
        }
        for(let i=0;i<this._searchEngines.length ; i++){
            const button = this._createOneButton(this._searchEngines[i],i);
            buttonsWrapper.appendChild(button);
        }
    }

    private _createOneButton = (engine:SearchEngineType,index:number)=>{
        const button = document.createElement("a");
        button.textContent = engine.name;
        button.href = "javascript:void(0);";
        // 设置初始链接为javascript:void(0);
        button.addEventListener("click", () => {
            const keyword = this.getSearchKeyword();
            if (keyword) {
                // 在新窗口或标签页中打开搜索引擎链接
                var url = engine.url + encodeURIComponent(keyword); 
                window.open(url, "_blank");
            }
        });
        // 设置按钮样式
        button.className = "search-engine-button";
        button.classList.add("large-button");
        if (index === 2 || index === 3) {
            button.classList.add("bottom-row");
        }
        return button;
    }

}
// ==UserScript==
// @name         小红书
// @namespace    http://tampermonkey.net/
// @version      2025-5-23
// @description  try to take over the world!
// @author       秋冬
// @match        *://www.xiaohongshu.com/*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js
// @require      https://siteimage-1302668844.cos.ap-nanjing.myqcloud.com/blog/uploads/2025-05/1747991857-brgc.js
// @grant        none
// ==/UserScript==




import DataCollectorContext from "../DataCollector";
import { PlatformTypeEnum } from "../lib/enums";
import XHSService from "../service/XHSService";



(function() {
    
    
    
    'use strict';
    if(
        window.location.href.includes('/search_result') 
        || window.location.href.includes('/profile/')
    ){
        new DataCollectorContext(PlatformTypeEnum.小红书);
    }

    if (window.location.href.includes('/explore/')){
        XHSService.loadNoteDownloader();
    }

    if (window.location.href.includes('/search_result')) {
        XHSService.loadOtherPlatformSearcher();
    }



})()






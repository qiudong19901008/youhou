// ==UserScript==
// @name         哔哩哔哩
// @namespace    http://tampermonkey.net/
// @version      2025-5-23
// @description  try to take over the world!
// @author       You
// @match        *://*.bilibili.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

// import DataExporterContext, { DataExporterTypeEnum } from "./DataExporter.old";

(function() {
    
    'use strict';
    if(window.location.href.includes('search.bilibili.com')){
        // new DataExporterContext(DataExporterTypeEnum.B站搜索);
    }
    // https://space.bilibili.com/3493130005383323
    if(window.location.href.includes('space.bilibili.com')){
        // new DataExporterContext(DataExporterTypeEnum.B站作者);
    }

})()






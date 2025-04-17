// ==UserScript==
// @name         小红书
// @namespace    http://tampermonkey.net/
// @version      2023-12-22
// @description  try to take over the world!
// @author       You
// @match        *://www.xiaohongshu.com/*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js
// @grant        none
// ==/UserScript==

import DataCollectorContext from "../DataCollectorFactory";
import { PlatformTypeEnum } from "../lib/enums";
import NoteDownloader from "./NoteDownloader";
import OtherPlatformSearcher from "./OtherPlatformSearcher";

(function() {
    
    'use strict';
    if(
        window.location.href.includes('/search_result') 
        || window.location.href.includes('/profile/')
    ){
        // new DataExporterContext(DataExporterTypeEnum.小红书);
        new DataCollectorContext(PlatformTypeEnum.小红书);
    }

    if (window.location.href.includes('/search_result')) {
        new OtherPlatformSearcher();
    }

    if (window.location.href.includes('/explore/')){
        new NoteDownloader();
    }

})()






import fs from 'fs'

const fp = `${process.cwd()}/dist/dist_xhs.js`;

let data = fs.readFileSync(fp,{encoding:'utf8'});

data = data.replace('import JSZip from"jszip";import*as XLSX from"xlsx";','');

const res = `
// ==UserScript==
// @name         小红书
// @namespace    https://www.qiudong123.com/
// @version      1.0
// @description  抓取小红书帖子数据
// @author       秋冬创业网
// @match        *://www.xiaohongshu.com/*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      https://static.qiudong123.com/wc/uploads/2025-10/1759578067-iObi.js
// @require      https://static.qiudong123.com/wc/uploads/2025-10/1759578062-Nj6T.js
// @grant        none
// ==/UserScript==
${data};
`

fs.writeFileSync(fp,res)

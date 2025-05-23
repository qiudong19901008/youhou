// import { mkConfig, generateCsv, download } from "export-to-csv";
// // import { RowObjType, RowType } from "../../DataExporter.old/Base";
// import { downloadToCsv, downloadToCsvByReader } from "./MyCsvExporter";


// interface DataToCsvExporterConfigType{
//     rowObjArr:RowObjType[],
//     headerArr:RowType,
//     fn:string,
    
//     // type:'my'|'export-to-csv'
// }


// export default class DataToCsvExporter{

//     private _rowObjArr:RowObjType[];
//     // private _rowArr:RowType[];
//     private _headerArr:RowType;
//     private _fn:string;
//     // private _type:'my'|'export-to-csv'

//     constructor(config:DataToCsvExporterConfigType){
//         this._rowObjArr = config.rowObjArr;
//         // this._rowArr = this._rowObjArrToRowArr(config.rowObjArr);
//         this._headerArr = config.headerArr;
//         this._fn = config.fn;
//         // this._type = config.type;
//     }

//     public run(){
//         this._downloadToCsvWithRowObjType(this._rowObjArr,this._fn,this._headerArr);
//     }


//     private _downloadToCsvWithRowObjType(rows:RowObjType[],fn:string,headersArr:string[]){
//         const csvConfig = mkConfig({ 
//             useKeysAsHeaders: true,
//             filename:fn,
//         });

//         rows.unshift({
//             title:headersArr[0],
//             url:headersArr[1],
//             uniqueId:headersArr[2],
//             thumbnail:headersArr[3],

//             authorName:headersArr[4],
//             authorUrl:headersArr[5],
//             authorUniqueId:headersArr[6],

//             viewCountStr:headersArr[7],
//             likeCountStr:headersArr[8],
//             durationSecondsStr:headersArr[9],

//             illegal:headersArr[10],

//             param1:headersArr[11],
//         })

//         // for(let row of rows){
//         //     row.url = JSON.stringify(row.url);
//         // }

//         const csv = generateCsv(csvConfig)(rows);
//         // console.log(csv)
//         // download(csvConfig)(csv)
//         // downloadToCsv(csv,fn);
//         downloadToCsvByReader(csv,fn)
//     }

//     // private _downloadToCsv(rows:RowType[],fn:string){
//     //     const csvConfig = mkConfig({ 
//     //         useKeysAsHeaders: true,
//     //         filename:fn,
//     //     });
//     //     const data = this._rowArrToRowObjArr(rows);
//     //     const csv = generateCsv(csvConfig)(data);
//     //     download(csvConfig)(csv)
//     // }

//     // private _rowObjArrToRowArr(rowObjArr:RowObjType[]){
//     //     let res:RowType[] = [];
//     //     for(let rowObj of rowObjArr){
//     //         res.push([
//     //             rowObj.title,
//     //             rowObj.url,
//     //             rowObj.uniqueId,
//     //             rowObj.thumbnail,

//     //             rowObj.authorName,
//     //             rowObj.authorUrl,
//     //             rowObj.authorUniqueId,

//     //             rowObj.viewCountStr,
//     //             rowObj.likeCountStr,
//     //             rowObj.durationSecondsStr,

//     //             rowObj.illegal,

//     //             rowObj.param1,
//     //         ])
//     //     }
//     //     return res;
//     // }



//     // private _rowArrToRowObjArr(rowArr:RowType[]){
//     //     const keys = rowArr[0];
//     //     const valuesArr = rowArr.filter((row,i)=>{
//     //         return i!== 0;
//     //     })
//     //     const data:any[] = [];
//     //     for(let values of valuesArr){
//     //         let obj:any = {};
//     //         for(let i=0;i<keys.length;i++){
//     //             const key = keys[i];
//     //             const value = values[i];
//     //             obj[key] = value;
//     //         }
//     //         data.push(obj);
//     //     }
//     //     return data;
//     // }


//     // private _myExportToCSV = (rows:RowType[], filename:string,headerArr:RowType)=>{
//     //     // navigator.msSaveBlob(blob, fileName);
//     //     rows.unshift(headerArr);

//     //     // 删除第三行数据
//     //     //data.splice(2, 1);
//     //     // 添加BOM头以处理UTF-8编码
//     //     // const begin = "data:text/csv;charset=utf-8,\uFEFF";
//     //     const begin = "data:text/csv;charset=utf-8,%EF%BB%BF";
//     //     const content = rows.map((row,i) => {
//     //         const one =  row.join(",");
//     //         return one;
//     //     }).join("\r\n");


//     //     const csv = begin + content;
//     //     const encodedUri = encodeURI(csv);
        
//     //     const link = document.createElement("a");
//     //     link.setAttribute("href", encodedUri);
//     //     link.setAttribute("download", filename);
//     //     document.body.appendChild(link);
//     //     // 需要将链接元素添加到文档中才能生效
//     //     link.click();
//     //     document.body.removeChild(link);
//     // }
// }



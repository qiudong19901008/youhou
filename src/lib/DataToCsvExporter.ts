import { mkConfig, generateCsv, download } from "export-to-csv";
import { RowObjType, RowType } from "../DataExporter/Base";


class DataToCsvExporter{


    public downloadToCsvWithRowObjType(rows:RowObjType[],fn:string,headersArr:string[]){
        const csvConfig = mkConfig({ 
            useKeysAsHeaders: true,
            // columnHeaders:headersArr,
            filename:fn,
            // showColumnHeaders:false,
        });

        rows.unshift({
            title:headersArr[0],
            url:headersArr[1],
            uniqueId:headersArr[2],
            thumbnail:headersArr[3],

            authorName:headersArr[4],
            authorUrl:headersArr[5],
            authorUniqueId:headersArr[6],

            viewCountStr:headersArr[7],
            likeCountStr:headersArr[8],
            durationSecondsStr:headersArr[9],

            illegal:headersArr[10],
        })

        const csv = generateCsv(csvConfig)(rows);
        download(csvConfig)(csv)
    }

    public downloadToCsv(rows:RowType[],fn:string){
        const csvConfig = mkConfig({ 
            useKeysAsHeaders: true,
            filename:fn,
        });
        const data = this._rowArrToObjArr(rows);
        const csv = generateCsv(csvConfig)(data);
        download(csvConfig)(csv)
    }

    private _rowArrToObjArr(rows:RowType[]){
        const keys = rows[0];
        const valuesArr = rows.filter((row,i)=>{
            return i!== 0;
        })
        const data:any[] = [];
        for(let values of valuesArr){
            let obj:any = {};
            for(let i=0;i<keys.length;i++){
                const key = keys[i];
                const value = values[i];
                obj[key] = value;
            }
            data.push(obj);
        }
        return data;
    }
}

export default new DataToCsvExporter();

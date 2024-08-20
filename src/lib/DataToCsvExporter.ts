import { mkConfig, generateCsv, download } from "export-to-csv";
import { RowType } from "../DataExporter/Base";


class DataToCsvExporter{

    // constructor(csvBtnId:string){
    //     const csvBtn = document.querySelector(`#${csvBtnId}`);
    //     csvBtn.addEventListener("click", () => {
    //         this.downloadToCsv()
    //     });
    // }

    // public init(csvBtnId:string){
    //     const csvBtn = document.querySelector(`#${csvBtnId}`);
    //     csvBtn.addEventListener("click", () => {
    //         this.downloadToCsv()
    //     });
    // }

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

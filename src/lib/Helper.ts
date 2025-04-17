import * as XLSX from 'xlsx';
import { BaseNoteDataType } from '../DataCollectorFactory/NoteDataGetter/BaseNoteDataGetter';

class Helper{


    public downloadNotes<T extends BaseNoteDataType>(dataArr:T[],fn:string){
        
        // 创建 Workbook 对象
        const workbook = XLSX.utils.book_new();
        
        // 创建 Worksheet 对象
        const worksheet = XLSX.utils.json_to_sheet(dataArr);
        
        // 将 Worksheet 添加到 Workbook 中
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        
        XLSX.writeFile(workbook, `${fn}.xlsx`);

    }


}
export default new Helper();
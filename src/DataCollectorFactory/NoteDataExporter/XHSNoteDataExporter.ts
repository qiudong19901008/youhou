import BaseNoteDataExporter from ".";




class XHSNoteDataExporter extends BaseNoteDataExporter{

    protected getRowObj(row: any): Object {
        throw new Error("Method not implemented.");
    }
    protected getXlsxName(): string {
        throw new Error("Method not implemented.");
    }
    
}
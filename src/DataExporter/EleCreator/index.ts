import DataToCsvExporter from "../../lib/DataToCsvExporter";
import DataCountEle from "./DataCountEle";
import DataDownloadBtn from "./DataDownloadBtn";



class EleCreator{

    public getDataCountEle(){
        return DataCountEle.getInstance();
    }

    public getDataDownloadBtn(exporter:DataToCsvExporter){
        return DataDownloadBtn.getInstance(exporter);
    }


}

export default new EleCreator();
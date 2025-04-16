import DataToCsvExporter from "../lib/DataToCsvExporter";


class DataExporterHelper{

    public createCountElement = ()=>{
        const countElement = document.createElement("div");
        countElement.style.position = "fixed";
        countElement.style.bottom = "100px";
        countElement.style.left = "20px";
        countElement.style.zIndex = "9999";
        countElement.style.backgroundColor = "#fff";
        countElement.style.padding = "10px";
        countElement.style.borderRadius = "5px";
        countElement.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
        countElement.style.fontWeight = "bold";
        countElement.style.fontSize = "16px";
        countElement.style.color = "#333";
        document.body.appendChild(countElement);
        return countElement;
    }


    public creatDownloadBtn = (exporter:DataToCsvExporter)=>{
        const downloadBtn = document.createElement("button");
        downloadBtn.id = 'downloadDataBtn';
        downloadBtn.innerText = "下载数据";
        downloadBtn.style.position = "fixed";
        downloadBtn.style.bottom = "140px";
        downloadBtn.style.left = "20px";
        downloadBtn.style.zIndex = "9999";
        downloadBtn.style.backgroundColor = "#4CAF50";
        downloadBtn.style.color = "#fff";
        downloadBtn.style.border = "none";
        downloadBtn.style.borderRadius = "5px";
        downloadBtn.style.padding = "10px";
        downloadBtn.style.fontSize = "16px";
        downloadBtn.style.cursor = "pointer";
        downloadBtn.addEventListener("click", () => {

            exporter.run();
            
        });
        document.body.appendChild(downloadBtn);
        return downloadBtn;
    }


}
export default new DataExporterHelper();
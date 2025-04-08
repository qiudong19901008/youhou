
type Newtype<URI, A> = {
    readonly _URI: URI;
    readonly _A: A;
};
const unpack = <T extends Newtype<any, any>>(newtype: T): T["_A"] => newtype as any as T["_A"];

const asBlob = (csvOutput: any): Blob => {
    const data = unpack(csvOutput);
    const blob = new Blob([data], {
      type: `text/csv;charset=utf8;`,
    });
    return blob;
};



export const downloadToCsvByReader  =  (data: any,fn:string) =>{
    return new Promise(resolve => {

      const blob = asBlob(data);

      const reader = new FileReader()
      reader.onload = (e) => {
        const url = e.target.result as string;
        const elink = document.createElement("a");
        elink.download = `${fn}.csv`;
        elink.style.display = "none";
        elink.href = url;
        console.log(elink.href)
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
        resolve(0);
      }
      reader.readAsDataURL(blob)
    })
  }

export const downloadToCsv = (data: any,fn:string) => {
    const blob = asBlob(data);

    const elink = document.createElement("a");
    elink.download = `${fn}.csv`;
    elink.style.display = "none";
    elink.href = URL.createObjectURL(blob);
    console.log(elink.href)
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href);
    document.body.removeChild(elink);

};
  
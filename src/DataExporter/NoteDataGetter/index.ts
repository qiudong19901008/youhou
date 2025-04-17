import { PlatformTypeEnum } from "../../lib/enums";
import XHSExtractOneNote from "./XHSNoteDataGetter";


class NoteDataGetter{

    public getXHSNoteData(ele:Element){
        return XHSExtractOneNote.run(ele);
    }

}

export default new NoteDataGetter();


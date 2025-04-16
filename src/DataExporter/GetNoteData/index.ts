import { PlatformTypeEnum } from "../../lib/enums";
import XHSExtractOneNote from "./XHSGetNoteData";


class GetNoteData{

    public run(type:PlatformTypeEnum){
        switch(type){
            case PlatformTypeEnum.小红书:
                XHSExtractOneNote
                break;
        }
    }

}

export default new GetNoteData();


import NoteDownloader from "./NoteDownloader";
import OtherPlatformSearcher from "./OtherPlatformSearcher";


class XHSService{


    public loadNoteDownloader(){
        return new NoteDownloader();
    }

    public loadOtherPlatformSearcher(){
        return new OtherPlatformSearcher();
    }

}
export default new XHSService();
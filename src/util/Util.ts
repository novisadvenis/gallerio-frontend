
export default class Util {
    static prependToImageByte = (imageData: string, type: string) => {
        return "data:image/"+type+";base64,"+imageData;
    }
}
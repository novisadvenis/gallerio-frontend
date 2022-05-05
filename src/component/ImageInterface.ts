import MetaData from "./MetaDataInterface";

interface ImageInterface {
    id: number,
    name: string,
    image: string,
    type: string,
    thumbnail: string
    metadata: MetaData[]
}

export default ImageInterface;
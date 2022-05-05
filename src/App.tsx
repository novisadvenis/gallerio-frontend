import React, {useEffect, useState} from 'react';
import Basic from "./component/Basic/Basic";
import Mix from "./component/Mix/Mix";
import Carousel from "./component/Carousel/Carousel";
import Dropdown from "./component/Dropdown/Dropdown";

import Upload from "./component/Upload/Upload";
import axios from "axios";
import ImageInterface from "./component/ImageInterface";
import Delete from "./component/Delete/Delete";


function App() {
    const [galleryType, setGalleryType] = useState("");
    const [imageList, setImageList] = useState<Array<ImageInterface>>(new Array());
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        const fetchData = async () => {
            setLoading(true);
            await axios.get('http://localhost:8080/image/getAll')
                .then((res) => {
                    setImageList(res.data);

                })
            setLoading(false);
        }
        fetchData();
    }, [])

    const renderSelected = (param: string) => {
        switch (param) {
            case "Carousel":
                return <Carousel imageList={imageList}/>;
                break;
            case "Mix":
                return <Mix imageList={imageList}/>;
                break;
            default:
                return <Basic imageList={imageList}/>;
        }
    }

    return (
        <div className="App w-full h-full m-3" >
            <Dropdown selected={setGalleryType}/>
            {loading && <h1 className="center">Loading</h1>
            && <img className="mx-auto" src="/loadingDots.gif" />}
            {!loading && renderSelected(galleryType)}
            <hr />
            <div className={"fixed bottom-2"}>
            <Upload />
            </div>
        </div>
    );
}

export default App;

import React, {useState} from 'react';
import Basic from "./component/Basic/Basic";
import Mix from "./component/Mix/Mix";
import Carousel from "./component/Carousel/Carousel";
import Dropdown from "./component/Dropdown/Dropdown";
import {ImageList} from "./component/ImageList"
import Table from "./component/UploadTable/Table";

function App() {
    const [galleryType, setGalleryType] = useState("");

    const renderSelected = (param: string) => {
        switch (param) {
            case "Carousel":
                return <Carousel imageList={ImageList}/>;
                break;
            case "Mix":
                return <Mix imageList={ImageList}/>;
                break;
            default:
                return <Basic imageList={ImageList}/>;
        }
    }

    return (
        <div className="App">
            <Dropdown selected={setGalleryType}/>
            {renderSelected(galleryType)}
            <hr />
            <Table />
        </div>
    );
}

export default App;

import React, {useEffect, useState} from "react";
import axios from "axios";

const Table = () => {

    let [retrievedImage, setRetrievedImage] = useState<any | undefined>() ;
    let [base64Data, setBase64Data] = useState<string | undefined>();
    let retrieveResponse : any | undefined;
    let [message, setMessage] = useState<string | undefined>("");
    let [imageName, setImageName] = useState<string>("");
    let [selectedFile, setSelectedFile] = useState<File | undefined>();

    const onFileChanged = (event: any) => {
        setSelectedFile(event.target.files[0]);
    }

    useEffect(()=>{
        setRetrievedImage('data:image/png;base64,' + base64Data)
    },[base64Data])

    //Gets called when the user clicks on submit to upload the image
    const onUpload = () => {
        console.log(selectedFile);
        //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
        const uploadImageData = new FormData();
        // @ts-ignore
        imageName = selectedFile.name;
        // @ts-ignore
        uploadImageData.append('imageFile', selectedFile, selectedFile.name);

        //Make a call to the Spring Boot Application to save the image
        axios.post('http://localhost:8080/image/upload', uploadImageData);
    }
    //Gets called when the user clicks on retieve image button to get the image from back end
    const getImage = () => {
        //Make a call to Sprinf Boot to get the Image Bytes.
        axios.get('http://localhost:8080/image/get/' + imageName)
            .then((res) => {
                retrieveResponse = res;
                console.log("reponse", res)
                setBase64Data(retrieveResponse.data.imageByte);
                console.log("imagebyte", retrieveResponse.data.imageByte);
                console.log("base64", 'data:image/png;base64,' + base64Data)
            });
    }
    return (
        <div>
            <div className="container row">
                <div className="col-md-">
                    <h1>Upload Image</h1>
                </div>
            </div>
            <div className="container row">
                <div className="col-md-6">
                    <input type="file" onChange={(e)=>onFileChanged(e)}/>
                </div>
                <div className="col-md-6">
                    <input type="button" onClick={onUpload} value="upload"/>
                </div>
            </div>
            <hr/>
            <div className="container row">
                <div className="col-md-">{message && <div>{message}</div>}
                </div>
                <div className="container row">
                    <div className="col-md-6">
                        <input type="text" className="form-control" id="name" placeholder="image name" name="name"
                               onChange={(name) => setImageName(name.target.value)}
                               value={imageName}/>
                    </div>
                    <div className="col-md-6">
                        <input type="button" onClick={getImage} value="Get Image"/>
                    </div>
                </div>
                <div className="container row">
                    <div className="col-md-">
                        {retrievedImage && <img src={retrievedImage}/>}
                    </div>
                </div>
            </div>
        </div>);
};
export default Table;
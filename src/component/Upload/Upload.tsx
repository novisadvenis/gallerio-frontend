import React, {useEffect, useState} from "react";
import axios from "axios";
import Loader from "../../util/Loader";

const Upload = () => {

    let [retrievedImage, setRetrievedImage] = useState<any | undefined>() ;
    let [base64Data, setBase64Data] = useState<string | undefined>();
    let retrieveResponse : any | undefined;
    let [message, setMessage] = useState<string | undefined>("");
    let [imageName, setImageName] = useState<string>("");
    let [imageId, setImageId] = useState<number | string>();
    //const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const [uploading,setUploading] = useState<boolean>(false);

    let selectedFile: File;

    const hiddenFileInput = React.useRef(null);

    const handleClick = () => {


        // @ts-ignore
        hiddenFileInput.current.click();

    };

    const onFileChanged = (event: any) => {
        selectedFile = event.target.files[0];
        //setSelectedFile();

        onUpload();
    }

    useEffect(()=>{
        setRetrievedImage('data:image/png;base64,' + base64Data)
    },[base64Data])

    //Gets called when the user clicks on submit to upload the image
    const onUpload = () => {

        //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
        const uploadImageData = new FormData();
        // @ts-ignore
        imageName = selectedFile.name;
        // @ts-ignore
        uploadImageData.append('imageFile', selectedFile, selectedFile.name);
        setImageName(imageName);

        //Make a call to the Spring Boot Application to save the image
        const upload = async () => {
            setUploading(true);
            await axios.post('http://localhost:8080/image/upload', uploadImageData)
                .then((res) => {
                    setMessage(res.data);
                });
            setUploading(false);
        }
        upload();
    }
    //Gets called when the user clicks on retieve image button to get the image from back end
    const getImage = () => {
        //Make a call to Spring Boot to get the ImageInterface Bytes.
        axios.get('http://localhost:8080/image/get/' + imageName)
            .then((res) => {
                retrieveResponse = res;

                setBase64Data(retrieveResponse.data.thumbnail);
                setImageId(retrieveResponse.data.id);


            });
    }


    return (
        < >
            <div className={""} onClick={()=>{
                handleClick()
            }}>
                <div className="bg-indigo-500 mb-2 cursor-pointer inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-full text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150">
                {uploading &&
                    <Loader/>
                     && <p className="text-lg">uploading...</p>}
                    {!uploading && <p className={"text-lg"}><span className="text-3xl">+</span></p>}
                </div>
                <input ref={hiddenFileInput} className={"hidden"} type="file" onChange={(e)=>onFileChanged(e)}/>
            </div>

            {/*
            <div className="container row">
                <div className="col-md-">
                    <h1>Upload ImageInterface</h1>
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
                <div className="col-md-">
                    <h2>{message && <div>{message}</div>}</h2>
                </div>
                <div className="container row">
                    <div className="col-md-6">
                        <input type="text" className="form-control" id="name" placeholder="image name" name="name"
                               onChange={(name) => setImageName(name.target.value)}
                               value={imageName}/>
                    </div>
                    <div className="col-md-6">
                        <input type="button" onClick={getImage} value="Get ImageInterface"/>
                    </div>
                </div>
                <div className="container row">
                    <div className="col-md-6">
                        <input type="number" className="form-control" id="name" placeholder="image name" name="name"
                               onChange={(id) => setImageId(id.target.value)}
                               value={imageId}/>
                    </div>
                    <div className="col-md-6">
                        <input type="button" onClick={deleteImage} value="Delete ImageInterface"/>
                    </div>
                </div>
                <div className="container row">
                    <div className="col-md-">
                        {retrievedImage && <img src={retrievedImage}/>}
                    </div>
                </div>
            </div>
        */}
        </>
    );
};
export default Upload;
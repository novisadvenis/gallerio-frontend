import React, {useEffect, useRef, useState} from 'react';
import GalleryProps from "../GalleryProps";
import ImageInterface from "../ImageInterface";
import Util from "../../util/Util";
import "./Basic.css";
import Table from "../Table/Table";
import axios from "axios";


const Basic = ({imageList}: GalleryProps) => {
    const localImageList = imageList;
    const [overlay, setOverlay] = useState(false);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const [selectedMetaData, setSelectedMetaData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState<number>();
    const [deleteOverlay, setDeleteOverlay] = useState<boolean>();


    const onDelete = () => {

        const deleteImage = async () => {
            // @ts-ignore
            await axios.delete('http://localhost:8080/image/delete/'+ localImageList[currentIndex].id );
        }
        deleteImage();

        // @ts-ignore
        delete localImageList[currentIndex];


        setDeleteOverlay(false);

    };

    // @ts-ignore
    return (
        <>
            <section className="overflow-hidden text-gray-700 ">
                <div className={"text-3xl text-right mr-28 rounded-lg"} style={{backgroundColor: "#BBBEF6",
                    marginLeft: "37%",
                    padding: "10px"}}>Basic View</div>
                {overlay && selectedImg &&
                    <div id="overlay" className={"fixed inset-0 z-20"}
                         style={{backgroundColor: "rgba(0,0,0,0.5)", cursor: "pointer"}}
                         onClick={()=>{
                             setOverlay(false);
                             setSelectedImg(null);

                         }}
                    >
                        <div

                            className={"relative inset-0"}
                            ><p
                            style={{
                                position: "fixed",
                                top: "-1%",
                                right: "2%",
                                fontSize: "64px",
                                pointerEvents: "none",
                                zIndex:"30",
                                color: "white",
                                transform:"rotate(45deg)"
                            }}
                        >+</p>
                        </div>
                        <div id="text" style={{
                            position: "absolute",
                            fontSize: "50px",
                            color: "white",
                            transform: "translate(-90%,-50%)",
                            top: "50%",
                            left: "50%"
                        }}
                             className={"scale-150"}>
                            <div className={"grid"} style={{
                                display: "grid",
                                gridAutoFlow: "column",
                            }}>
                                <div style={{marginRight: "10px"}}>
                                    <img alt="gallery"
                                         onClick={(e) => {
                                             setOverlay(false);
                                             setSelectedImg(null);
                                             setSelectedMetaData([]);
                                         }}
                                         className=" object-cover object-center  rounded-lg "
                                         style={{height: "85vh", width: "min-content"}}
                                         src={selectedImg}/>
                                </div>
                                <div className={"text-sm"}
                                     style={{fontSize: "16px", width: "10px"}}
                                >
                                    {selectedMetaData.length > 0 &&
                                        <div>
                                            {//@ts-ignore
                                                <Table list={selectedMetaData}></Table>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>}

                <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                    <div className="flex flex-wrap -m-1 md:-m-2">
                        {//@ts-ignore
                            localImageList.map((data: ImageInterface, index: number) => {
                            return (
                                <div className=" relative group flex flex-wrap w-1/3" key={index}>
                                    <div id={"basicDelete-"+index} onClick={(e) => {
                                        let index: number = parseInt(e.currentTarget.id.split("-")[1]);
                                        setDeleteOverlay(true);
                                        setCurrentIndex(index);
                                    }}
                                         className={"hidden group-hover:block"} style={{
                                        position: "absolute",
                                        top: "-3%",
                                        right: "3%",
                                        fontSize: "61px",
                                        transform: "rotate(45deg)",
                                        color: "white",
                                    }}>+
                                    </div>
                                    <div className="w-full p-1 md:p-2">
                                        <img alt="gallery"
                                             onClick={(e) => {
                                                 setOverlay(true);
                                                 let index: number = parseInt(e.currentTarget.id.split("-")[1]);
                                                 setSelectedImg(e.currentTarget.src);
                                                 setCurrentIndex(index);
                                                 // @ts-ignore
                                                 setSelectedMetaData(localImageList[index].metadata)
                                             }}
                                             id={"basic-" + index}
                                             className="block object-cover object-center w-full h-full rounded-lg"
                                             src={Util.prependToImageByte(data.image, data.type)}/>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
                {deleteOverlay &&
                    <div id="overlay" className={"fixed inset-0"}
                         style={{backgroundColor: "rgba(0,0,0,0.5)", zIndex: "2", cursor: "pointer"}}
                    >
                        <div id="text" className={""} style={{
                            position: "absolute",
                            fontSize: "50px",
                            color: "white",
                            transform: "translate(-50%,-50%)",
                            top: "50%",
                            left: "50%"
                        }}
                        >
                            <div className={"text-lg bg-slate-800 rounded-lg p-24"}>
                        <p>Are you really sure, you want to delete this Image??</p>
                        <div className={"flex flex-row w-full"}>
                            <button className={"w-1/2"} onClick={()=> {
                                onDelete();
                            }
                            }>Yes</button>
                            <button className={"w-1/2"} onClick={()=>{
                            setDeleteOverlay(false);
                            }
                            }>No</button>
                        </div>
                            </div>
                        </div>

                    </div>}
            </section>
        </>
    );
}

export default Basic;

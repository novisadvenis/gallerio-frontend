import React from "react";
import GalleryProps from "../GalleryProps";
import ImageInterface from "../ImageInterface";
import Queue from "../../model/Queue";
import Util from "../../util/Util";


const widthFullImage = (src: string, index: number) => {
    return (
        <div className="w-full p-1 md:p-2" key={index}>
            <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                 src={src}/>
        </div>
    )
}

const widthHalfImage = (src: string, index: number) => {
    return (<div className="w-1/2 p-1 md:p-2" key={index}>
        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
             src={src}/>
    </div>);
}
const prepareElement = ({imageList}: GalleryProps) => {
    let perChunk = 3;

    let result = imageList.reduce((resultArray: ImageInterface[][], item: ImageInterface, index: number) => {

        const chunkIndex = Math.floor(index / perChunk)

        if (!resultArray[chunkIndex]) {
            // @ts-ignore
            resultArray[chunkIndex] = [] // start a new chunk
        }

        // @ts-ignore
        resultArray[chunkIndex].push(item)

        return resultArray
    }, []);

    //console.table(result)

    let arrayCounter = 1;
    let ele = result.map((data, index: number) => {


        let ele1;
        if (data.length < 3) {
            ele1 = data.map(((value, index1) => {
                return widthFullImage(Util.prependToImageByte(value.image,value.type), index1)
            }))
        } else {
            ele1 = data.map((value, index1) => {

                let imageSrc: string = Util.prependToImageByte(value.image,value.type);
                let keyIndex = arrayCounter * (index1 + 1);
                if (arrayCounter % 2 === 0) {
                    if (index1 === 0) {

                        return widthFullImage(imageSrc, index1)
                    } else {

                        return widthHalfImage(imageSrc, index1)
                    }
                } else {
                    if (index1 === 2) {

                        return widthFullImage(imageSrc, index1)
                    } else {

                        return widthHalfImage(imageSrc, index1)
                    }
                }
            });

        }
        arrayCounter++;
        return ele1;
    });


    return ele;
};

const Mix = (images: GalleryProps) => {
    return (
        <>

        <section className="overflow-hidden text-gray-700">
            <div className={"text-3xl text-right mr-28 rounded-lg"} style={{backgroundColor: "#BBBEF6",
                marginLeft: "37%",
                padding: "10px"}}>Mix View</div>
            <div className="container flex px-5 py-2 w-full rounded-lg
            my-8 bg-gray-900 px-3.5 py-3.5 snap-x flex flex-row min-h-min overflow-x-auto mx-auto" >
                {prepareElement(images).map((array,index) => {
                    return (
                        <div key={"mix-"+index} className="flex max-w-fit flex-wrap "
                        style={{minWidth:"370px"}}>
                            {array}
                        </div>
                    )
                })
                }
            </div>
        </section>
        </>
    );
}

export default Mix;
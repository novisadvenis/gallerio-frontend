import React from "react";
import GalleryProps from "../GalleryProps";
import Image from "../Image";
import Queue from "../../model/Queue";


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

    let result = imageList.reduce((resultArray: Image[][], item: Image, index: number) => {
        //console.log("resultArray", resultArray)
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

        console.log("ArrayCounter", arrayCounter);
        let ele1;
        if (data.length < 3) {
            ele1 = data.map(((value, index1) => {
                return widthFullImage(value.image.src, index1)
            }))
        } else {
            ele1 = data.map((value, index1) => {

                let imageSrc: string = value.image.src;
                let keyIndex = arrayCounter * (index1 + 1);
                if (arrayCounter % 2 === 0) {
                    if (index1 === 0) {
                        console.log("i am big", index1)
                        return widthFullImage(imageSrc, index1)
                    } else {
                        console.log("i am small", index1)
                        return widthHalfImage(imageSrc, index1)
                    }
                } else {
                    if (index1 === 2) {
                        console.log("i am big", index1)
                        return widthFullImage(imageSrc, index1)
                    } else {
                        console.log("i am small", index1)
                        return widthHalfImage(imageSrc, index1)
                    }
                }
            });

        }
        arrayCounter++;
        return ele1;
    });

    //console.log("element", ele)
    return ele;
};

const Mix = (images: GalleryProps) => {
    return (
        <section className="overflow-hidden text-gray-700">
            <div className="container flex px-5 py-2 mx-auto lg:pt-24 lg:px-32">

                {prepareElement(images).map((array) => {
                    return (
                        <div className="flex w-full h-full flex-wrap">
                            {array}
                        </div>
                    )
                })

                }

            </div>
        </section>
    );
}

export default Mix;
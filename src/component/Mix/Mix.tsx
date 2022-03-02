import React from "react";
import GalleryProps from "../GalleryProps";
import Image from "../Image";


const prepareElement = ({imageList}: GalleryProps): JSX.Element => {
    let perChunk = 3;

    let result = imageList.reduce((resultArray: Image[], item: Image, index: number) => {
        console.log("resultArray", resultArray)
        const chunkIndex = Math.floor(index / perChunk)

        if (!resultArray[chunkIndex]) {
            // @ts-ignore
            resultArray[chunkIndex] = [] // start a new chunk
        }

        // @ts-ignore
        resultArray[chunkIndex].push(item)

        return resultArray
    }, []);

    console.table(result)
    result.map((data, index: number, array: Image[]) => {
        let counter = 0;
        console.log("data", data)
        array.map((value: Image, index1, array1) => {

            console.log("image", value);
            let imageSrc : string = value.image.src;
            if (index1 === 2 && counter === 0) {

                counter += 1;
                return (
                    <div className="w-full p-1 md:p-2" key={index}>
                        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                             src={imageSrc}/>
                    </div>
                );
            } else {
                counter = 0;
                return (
                    <div className="w-1/2 p-1 md:p-2" key={index}>
                        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                             src={imageSrc}/>
                    </div>
                );
            }
        })

    });


    return (
        <>
        </>
    );
    /*
        let elements = new Array();
        let imgArr = new Array();
        imageList.map((data: Image, index: number, array: Image[]) => {
           let counter = index + 1;

            if (counter % 3 === 0 || counter % 4 === 0) {
                imgArr.push(
                    <div className="w-full p-1 md:p-2" key={index}>
                        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                             src={data.image.src}/>
                    </div>)
                if (counter % 3 === 0) {
                    elements.push(imgArr)
                    imgArr = new Array();
                    counter -= 3;
                }
            } else {
                imgArr.push(
                    <div className="w-1/2 p-1 md:p-2" key={index}>
                        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                             src={data.image.src}/>
                    </div>)
            }
        });

        return (
            <>
                {elements.map((ele, index) => {
                    return (
                        <div className="flex flex-wrap w-1/2" key={index}>
                            {ele}
                        </div>
                    );

                })}

            </>
        );*/
    /*
    imageList.map((data: Image, index: number) => {
        if (index < 3) {
            if (index === 2) {
                elements.push(
                    <div className="w-full p-1 md:p-2" key={index}>
                        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                             src={data.image.src}/>
                    </div>
                );

            } else {
                elements.push(
                    <div className="w-1/2 p-1 md:p-2" key={index}>
                        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                             src={data.image.src}/>
                    </div>
                );
            }
        } else {
            if (index === 3) {
                elements.push(
                    <div className="w-full p-1 md:p-2" key={index}>
                        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                             src={data.image.src}/>
                    </div>
                );
            } else {
                elements.push(
                    <div className="w-1/2 p-1 md:p-2" key={index}>
                        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                             src={data.image.src}/>
                    </div>
                );
            }
        }
    });
    return (
        <>
            <div className="flex flex-wrap w-1/2">
                {elements.slice(0, 3).map((ele) => {
                    return ele;
                })}
            </div>
            <div className="flex flex-wrap w-1/2">
                {elements.slice(3, elements.length).map((ele) => {
                    return ele;
                })}
            </div>
            <div className="flex flex-wrap w-1/2">
                {elements.slice(3, elements.length).map((ele) => {
                    return ele;
                })}
            </div>
        </>
    );*/

}

const Mix = (images: GalleryProps) => {
    return (
        <section className="overflow-hidden text-gray-700">
            <div className="container px-5 py-2 mx-auto lg:pt-24 lg:px-32">
                <div className="flex flex-wrap -m-1 md:-m-2">
                    {prepareElement(images)}
                </div>
            </div>
        </section>
    );
}

export default Mix;
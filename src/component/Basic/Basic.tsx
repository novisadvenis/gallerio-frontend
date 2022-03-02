import React from 'react';
import GalleryProps from "../GalleryProps";
import Image from "../Image";

const Basic = ({imageList}: GalleryProps) => {
    const imageList2 = imageList;
    return (
        <section className="overflow-hidden text-gray-700 ">
            <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                <div className="flex flex-wrap -m-1 md:-m-2">
                    {imageList2.map((data: Image, index: number) => {
                        return (
                            <div className="flex flex-wrap w-1/3" key={index}>
                                <div className="w-full p-1 md:p-2">
                                    <img alt="gallery"
                                         className="block object-cover object-center w-full h-full rounded-lg"
                                         src={data.image.src}/>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}

export default Basic;

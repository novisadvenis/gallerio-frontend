import React, {useState} from "react";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import Swipe from "react-easy-swipe";
import galleryProps from "../GalleryProps";


function Carousel({imageList}: galleryProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [pause, setPause] = useState(false);

    const nextSlide = () => {
        let newSlide = currentSlide === imageList.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(newSlide);
    };

    const prevSlide = () => {
        let newSlide = currentSlide === 0 ? imageList.length - 1 : currentSlide - 1;
        setCurrentSlide(newSlide);
    };


    return (
        <div className="mt-8">
            <div className="max-w-lg h-72 flex overflow-hidden relative mx-auto">
                <AiOutlineLeft
                    onClick={prevSlide}
                    className="absolute left-0 text-3xl inset-y-1/2 text-white cursor-pointer"
                />

                <Swipe onSwipeLeft={nextSlide} onSwipeRight={prevSlide}>
                    {imageList.map((slide, index) => {
                        return (
                            <img
                                src={slide.image.src}
                                alt="This is a carousel slide"
                                key={index}
                                className={
                                    index === currentSlide
                                        ? "block w-full h-auto object-cover"
                                        : "hidden"
                                }
                                onMouseEnter={() => {
                                    setPause(true);
                                }}
                                onMouseLeave={() => {
                                    setPause(false);
                                }}
                            />
                        );
                    })}
                </Swipe>

                <div className="absolute w-full flex justify-center bottom-0">
                    {imageList.map((element, index) => {
                        return (
                            <div
                                className={
                                    index === currentSlide
                                        ? "h-2 w-2 bg-blue-700 rounded-full mx-2 mb-2 cursor-pointer"
                                        : "h-2 w-2 bg-white rounded-full mx-2 mb-2 cursor-pointer"
                                }
                                key={index}
                                onClick={() => {
                                    setCurrentSlide(index);
                                }}
                            ></div>
                        );
                    })}
                </div>

                <AiOutlineRight
                    onClick={nextSlide}
                    className="absolute right-0 text-3xl inset-y-1/2 text-white cursor-pointer"
                />
            </div>
        </div>
    );
}

export default Carousel;
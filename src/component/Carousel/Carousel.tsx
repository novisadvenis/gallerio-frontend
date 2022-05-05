import React, {useState} from "react";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import Swipe from "react-easy-swipe";
import galleryProps from "../GalleryProps";
import Util from "../../util/Util";
import axios from "axios";


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

    const updateImageName = (id:number, value:string) => {

        const update = async () => {
            await axios.get('http://localhost:8080/image/update/'+ id+"?name="+value)
        }
        update();
    }

    return (
        <>
            <section className="overflow-hidden text-gray-700">
            <div className={"text-3xl text-right mr-28 rounded-lg"} style={{backgroundColor: "#BBBEF6",
                marginLeft: "37%",
                padding: "10px"}}>Carousel View</div>
            <div className=" rounded-lg mt-8 bg-gray-900 px-3.5 py-3.5 snap-x flex flex-row max-w-5xl mx-auto h-max overflow-x-auto">
                {imageList.map((element, index) => {
                    return (
                        <div
                            className={"flex-none my-auto w-auto scroll-ml-6 snap-start mr-3 " +
                                (index === currentSlide
                                    ? "border-2 border-violet-600"
                                    : "")

                            }
                            key={index}
                            onClick={() => {
                                setCurrentSlide(index);
                            }}
                        >
                            <img className="" src={Util.prependToImageByte(element.thumbnail, element.type)}/>
                        </div>
                    );
                })}
            </div>
            <div className="mt-1">
                <div className=" rounded-lg border-solid border-2 border-slate-900  flex overflow-hidden max-w-5xl mx-auto">
                    <div className="flex bg-slate-300" onClick={prevSlide}>
                        <AiOutlineLeft
                            className="self-center fill-indigo-500 text-3xl inset-y-1/2 text-white cursor-pointer"
                        />
                    </div>
                    <Swipe onSwipeLeft={nextSlide} onSwipeRight={prevSlide} className="mx-auto">
                        {imageList.map((slide, index) => {
                            return (
                                <figure className={"relative"} key={index}>
                                <img
                                    src={Util.prependToImageByte(slide.image, slide.type)}
                                    alt="This is a carousel slide"

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
                                    <figcaption className={index === currentSlide ? "block" :"hidden" } >
                                        <input id={"captionName-"+slide.id}
                                               style={{backgroundColor: "beige",
                                                   minWidth: "max-content"}}
                                               className={"h-10 absolute top-10 right-5 text-lg text-black dark:bg-slate-50 px-4"}
                                               type={"text"} placeholder={slide.name} onBlur={(e)=>{
                                            let id: number = parseInt(e.currentTarget.id.split("-")[1]);
                                            updateImageName(id,e.currentTarget.value);
                                        }}/>
                                    </figcaption>
                                </figure>
                            );
                        })}
                    </Swipe>

                    <div className="flex bg-slate-300" onClick={nextSlide}>
                        <AiOutlineRight

                            className=" self-center fill-indigo-500 text-3xl inset-y-1/2 text-white cursor-pointer"
                        />
                    </div>

                </div>
            </div>
                </section>
        </>
    );
}

export default Carousel;
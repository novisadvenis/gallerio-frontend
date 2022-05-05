import React, {useEffect, useState} from "react";

const Dropdown = (props: any) => {
    const [dropDown, setDropdown] = useState(false);
    const dropDownList = ["Basic", "Mix", "Carousel"];
    const [selected, setSelected] = useState("Basic");

    return (
        <>
            <div className={"sticky top-2 z-10 max-w-fit"}>
            <button id="dropdownButton" onClick={() => {
                setDropdown(!dropDown)
            }}
                    className=" my-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button">Dropdown button <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20"
                                                       xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"></path>
            </svg></button>
            {dropDown &&
                <div id="dropdown"
                     className="px-1.5 ml-1.5 inline-flex z-10 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                    <ul className="py-1 inline-flex" aria-labelledby="dropdownButton">
                        {dropDownList.map((v, i) => {
                            return (<li key={i} className={v === selected  ? "bg-indigo-500" : ""} onClick={() => {
                                    props.selected(v);
                                    setSelected(v);
                                    setDropdown(!dropDown);
                                }}>
                                    <a href="#"
                                       className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                        {v}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>}
            </div>
        </>

    );
}

export default Dropdown;


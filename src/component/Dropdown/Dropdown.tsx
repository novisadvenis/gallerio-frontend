import React, {useEffect, useState} from "react";

function Dropdown(props: any) {
    const [dropDown, setDropdown] = useState(false);
    const dropDownList = ["Basic", "Mix", "Carousel"];
    const [selected, setSelected] = useState("Basic");

    return (
        <>
            <button id="dropdownButton" onClick={() => {
                setDropdown(!dropDown)
            }}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button">Dropdown button <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor"
                                                       viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg></button>
            {dropDown &&
                <div id="dropdown"
                     className=" z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                    <ul className="py-1" aria-labelledby="dropdownButton">
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
        </>

    );
}

export default Dropdown;


import React, {useState} from "react";
import Loader from "../../util/Loader";

const Delete = () => {

    const [deleting, setDeleting] = useState(false);

    const handleClick = () => {

    }

    return(
        <>
            <div className={""} onClick={()=>{
                handleClick()
            }}>
                <div className="bg-indigo-500 cursor-pointer inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-full text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150">
                    {deleting &&
                        <Loader/>
                        && <p className="text-lg">uploading...</p>}
                    {!deleting && <p className={"text-lg"}><span className="text-3xl w-4 h-4">&nbsp;-&nbsp;</span></p>}
                </div>
            </div>
        </>
    );
};
export default Delete;
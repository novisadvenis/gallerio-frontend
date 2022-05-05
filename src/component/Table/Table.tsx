import React from "react";
import MetaDataInterface from "../MetaDataInterface";
import axios from "axios";
import ImageInterface from "../ImageInterface";


const Table = ({list,img, ...props}: any ) => {

    const updateMetaDataValue = (id:number, value:string) => {
        console.log("updating metadata value")
        const update = async () => {
            await axios.get('http://localhost:8080/metadata/update/'+ id+"?value="+value)
        }
        update();
        // @ts-ignore
        list.find(m=> m.id ===id).value = value;
        console.log("finished updating metadata value")
    }

    return (
        <>
            <table className=" rounded-lg table-auto w-full text-sm bg-white dark:bg-slate-800"
                   style={{height: "max-content", width: "max-content"}}
                   onClick={(e)=>{
                       e.stopPropagation();
                   }}
            >
                <thead
                    className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody className={""}>
                {list.map(((metaData: MetaDataInterface, index: number) => {
                    //todo find better logic to filter out.
                    if (metaData.name.length < 15 || metaData.value.length < 15) {
                        if (metaData.value.length < 15) {
                            return (<tr key={index} >
                                <td>{metaData.name}</td>
                                <td><input id={"metadata-"+metaData.id} className={"dark:bg-slate-800"}
                                           type="text"
                                           placeholder={metaData.value}

                                onBlur={(e)=>{
                                    console.log("currentInput value ",e.currentTarget.value);
                                    //todo call request to update metadata
                                    let id: number = parseInt(e.currentTarget.id.split("-")[1]);
                                    console.log("metadata id ", id);
                                    updateMetaDataValue(id,e.currentTarget.value);
                                }}
                                /></td>
                                <td>{metaData.type}</td>
                            </tr>)
                        }
                    }
                    return;
                }))}
                </tbody>
            </table>
        </>
    );
}

export default Table;
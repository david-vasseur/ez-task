"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import {  FaPencil, FaX } from "react-icons/fa6";


function List({name}: {name: string}) {

    const [option, setOption] = useState(false);
    const modRef = useRef(null);
    const deleteRef = useRef(null);

    useEffect(() => {
        if (!modRef.current || !deleteRef.current) return;
        gsap.set([modRef.current, deleteRef.current], { opacity: 0, scale: 0 });
    }, []);

    useGSAP(() => {
        if (!modRef.current || !deleteRef.current) return

        if (option) {
            gsap.to(modRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: "elastic.inOut" });
            gsap.to(deleteRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: "elastic.inOut", delay: 0.2 });
        } else {
            gsap.to(deleteRef.current, { opacity: 0, scale: 0, duration: 0.6, ease: "elastic.inOut"});
            gsap.to(modRef.current, { opacity: 0, scale: 0, duration: 0.6, ease: "elastic.inOut", delay: 0.2 });
        }


    }, [option])


    return (
        <div onClick={() => setOption(!option)} className="w-[80vw] xl:w-[66vw] relative h-10 xl:h-20 rounded-full bg-linear-to-tr from-purple-900 to-purple-500 flex items-center font-semibold">
            <p className="ml-5">{name}</p>
            <div ref={modRef} className="absolute right-10">
                <FaPencil className="h-8 xl:h-19 w-8 xl:w-19 rounded-full bg-yellow-400/50 p-1" />
            </div>
            <div ref={deleteRef} className="absolute right-1">
                <FaX className="h-8 xl:h-19 w-8 xl:w-19 rounded-full bg-red-500/50 p-1" />
            </div>
            
               

            
            {/* <FaCheck className="h-8 xl:h-19 w-8 xl:w-19 rounded-full bg-green-500/50 p-1" /> */}
        </div>
    )
}

export default List;
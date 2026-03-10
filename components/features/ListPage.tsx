"use client"

import { useUserStore } from "@/lib/store/userStore";
import { IList } from "@/type/list";
import { useState } from "react";
import ListForm from "../form/ListForm";
import { FaPlusCircle } from "react-icons/fa";

function ListPage({ lists }: { lists: IList[] }) {

        const { familyId, family, token } = useUserStore();
        const [add, setAdd] = useState<boolean>(false);

    return (
        <div className="mt-28">
            <div className="flex flex-col items-center gap-5">
                <h2 className="text-[2.5rem] font-extrabold text-[#dbd8e3] text-center">Groupe {family}</h2>
                <div className="flex gap-5 relative">
                    {add && token && (
                        <div className="absolute scale-[0.8] sm:scale-[1] -translate-x-[60%] transition-all duration-300">
                            <ListForm familyId={familyId} token={token} />
                        </div>
                    )}
                    <FaPlusCircle 
                        className={`text-[#3e065f] rounded-full text-[3rem] transition ease duration-300 absolute translate-x-[300%] sm:translate-x-[400%] hover:cursor-pointer ${add ? "rotate-45 bg-[red]" : "bg-zinc-100/60"}`} 
                        onClick={() => { setAdd(!add) }} 
                    />
                    </div>
                <div className="flex flex-col gap-10 mt-20 mb-20 justify-center items-center">
                    {lists && lists.length > 0 ? lists.map(list => (
                        <p key={list.id}>{list.name}</p>

                        )
                        ) : (
                            <p>aucune liste n'a encore été créé.</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ListPage;
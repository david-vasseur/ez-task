"use client"

import { getAllTreeAction } from '@/lib/actions/listAction';
import { useUserStore } from '@/lib/store/userStore';
import React, { useEffect, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa';

function page() {

    const { familyId, family } = useUserStore();
  const [add, setAdd] = useState(true);
  const [lists, setLists] = useState<{ id: number; name: string; familyId: number; createdAt: Date; updatedAt: Date }[]>([]);
  const [isModified, setIsModified] = useState();  
  const [updateValue, setUpdateValue] = useState('');

//   useEffect(() => {
    
//     if (!socket) {
//       return;
//     }

//     socket.on('listAdded', (newList) => {
//       setLists(prevLists => [newList, ...prevLists]); 
//     });

//     socket.on('listUpdated', (updatedList) => {
//       setLists(prev => prev.map(list => (list.id === updatedList.id ? { ...list, name: updatedList.name } : list)));
//     });

//     socket.on('listDeleted', (deletedList) => {
//       setLists(prev => prev.filter(list => list.id !== deletedList.id));
//     });

//     return () => {
//       socket.off('listAdded');
//       socket.off('listUpdated');
//       socket.off('listDeleted');
//     };
//   }, [socket]);
  

    useEffect(() => {
        const fetchTrees = async () => {
            try {
            const trees = await getAllTreeAction(familyId);
            setLists(trees?.data ?? []);
            } catch (error) {
            console.error("Erreur lors du fetch des listes :", error);
            }
        };
        fetchTrees();
    }, [familyId]);


//   const handleDelete = async (id) => {
//     const deletedList = await deleteTree(csrf, id);
//     showModal('BRAVO', deletedList.message);
//     setLists(prev => prev.filter(list => list.id !== id));
//   };

//   const handleUpdate = async (id, name) => {
//     await updateTree(csrf, id, name);
//     setLists(prev => prev.map(list => (list.id === id ? { ...list, name: updateValue } : list)));
//     showModal('BRAVO', "La liste a été mis à jour.");
//   };

    return (
        <div className="mt-28">
            <div className="flex flex-col items-center gap-5">
                <h2 className="text-[2.5rem] font-extrabold text-[#dbd8e3] text-center">Groupe {family}</h2>
                <div className="flex gap-5 relative">
                    {/* {!add && (
                        <div className="absolute scale-[0.8] sm:scale-[1] -translate-x-[60%] transition-all duration-300">
                            <TodoInput familyId={familyId} />
                        </div>
                    )} */}
                    <FaPlusCircle 
                        className={`text-[#3e065f] rounded-full text-[3rem] transition ease duration-300 absolute translate-x-[300%] sm:translate-x-[400%] hover:cursor-pointer ${!add ? "rotate-45 bg-[red]" : "bg-[green]"}`} 
                        onClick={() => { setAdd(!add) }} 
                    />
                    </div>
                <div className="flex flex-col gap-10 mt-20 mb-20 justify-center items-center">
                    {lists && lists.length > 0 ? lists.map(list => (
                    // <Card key={list.id} item={list} onDelete={handleDelete} onUpdate={handleUpdate} isModified={isModified} setIsModified={setIsModified} updateValue={updateValue} setUpdateValue={setUpdateValue} />
                    <p key={list.id}>{list.name}</p>

                    ))
                    : (
                    <p>aucune liste n'a encore été créé.</p>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default page;
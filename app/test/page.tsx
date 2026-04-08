"use client"

import ListForm from '@/components/form/ListForm';
import List from '@/components/ui/List';
import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react'

function page() {

    const [add, setAdd] = useState<boolean>(false);

    return (
        <div className="pt-20 min-h-screen flex flex-col gap-10 items-center justify-start bg-gray-600">
            <div className="flex justify-between w-[90vw] max-w-4xl">
                <div className="flex gap-2 items-center justify-center">
                    <span className="w-7 h-7 bg-gray-500 rounded-full shadow-md shadow-gray-800"></span>
                    <p>A faire</p>
                </div>
                <div className="flex gap-2 items-center justify-center">
                    <span className="w-7 h-7 bg-yellow-500 rounded-full shadow-md shadow-gray-800"></span>
                    <p>En cours</p>
                </div>
                <div className="flex gap-2 items-center justify-center">
                    <span className="w-7 h-7 bg-green-500 rounded-full shadow-md shadow-gray-800"></span>
                    <p>Terminée</p>
                </div>
            </div>
			<div className='flex gap-1 items-center justify-center'>
                <span className="text-xl text-gray-900">
                    Ajouter une nouvelle liste
                </span>                 
                <button onClick={() => setAdd(!add)} className="pl-5">
                    <PlusCircle className={`w-7 h-7 ${add ? "text-red-500 rotate-45" : "text-green-500"} transition-all duration-300`} />
                </button>
            </div>
			
			<ListForm familyId={2} token="azeza" open={add} />
            <div className="flex flex-col gap-2 items-center">
                <List name="Ma liste de course" />
                <span className='w-60 h-px bg-gray-500'></span>
                <List name="Ma liste de course" />
                <span className='w-60 h-px bg-gray-500'></span>
                <List name="Ma liste de course" />
                <span className='w-60 h-px bg-gray-500'></span>
                <List name="Ma liste de course" />
                <span className='w-60 h-px bg-gray-500'></span>
                <List name="Ma liste de course" />
                <span className='w-60 h-px bg-gray-500'></span>
                <List name="Ma liste de course" />
            </div>
			
		</div>
		
    )
}

export default page
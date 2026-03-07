"use client"

import BackButton from '@/components/BackButton';
import LoginForm from '@/components/LoginForm';
import SignForm from '@/components/SignForm';
import React, { useState } from 'react'

function Sign() {

    const [isRegister, setIsRegister] = useState(true);

    return (
        <div className="flex flex-col gap-5 items-center mt-28 mb-20">
        <div className="flex"> 
        {!isRegister && (
            <BackButton onClick={() => {setIsRegister(!isRegister)}}/> 
        )}
            <h2 className="text-[#dbd8e3] font-bold text-[2rem]">{isRegister ? "Se connecter" : "Inscrivez vous"}</h2>
        </div>
            {
            isRegister ? (
                <LoginForm />
            ) : (
                <SignForm setIsRegister={setIsRegister} />
            )
            }
            {
            isRegister && (
                <button onClick={() => {setIsRegister(false)}} className="text-[#dbd8e3] font-bold mt-32 text-[1rem] underline transition-all ease-in duration-200 hover:text-[blue] hover:underline-offset-2">Pas encore inscrit ? Cliquez ici !</button>
            )
            }
        </div>
    )
}

export default Sign;
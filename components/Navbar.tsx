"use client"

import { useUserStore } from '@/lib/store/userStore';
import Link from 'next/link';

function NavBar() {
    
    const isConnected = useUserStore((state) => state.isConnected)
    const firstName = useUserStore((state) => state.firstName)
    const { familyId } = useUserStore();

  return (
    <div className="fixed top-0 right-0 w-screen z-50 backdrop-blur-sm blur-[0.5px] bg-linear-to-r from-[#3e065f9a] via-[#6f0b9793] to-[#8d05c29f] flex justify-between items-center">
        <img src='./images/icon.jpg' className="w-12 rounded-3xl p-1 ml-5" />
        <ul className=' text-[#DBD8E3] flex gap-5 h-16 justify-end pr-5 items-center font-extrabold'>
            <li>
                <Link href={"/"}>Accueil</Link>
            </li>
            
                {
                    isConnected === true ? (
                    <>
                        <li>
                            <Link href={`/todo/${familyId}`}>Mes listes</Link>
                        </li>
                        <li>
                            <Link href={"/profile"}>{firstName}</Link>
                        </li>
                    </>
                    ) : (
                        <li>
                            <Link href={"/sign"}>Se connecter</Link>
                        </li>
                    )
                }
        </ul>
    </div>
  )
}

export default NavBar;
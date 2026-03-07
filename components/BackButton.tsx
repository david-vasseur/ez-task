"use client"

import { useRouter } from 'next/navigation';
import { TfiAngleLeft } from 'react-icons/tfi';

function BackButton({ onClick }) {
    
    const router = useRouter();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            router.back()
        }
    }

    return (
        <div>
            <button onClick={handleClick} className="flex items-center text-[#dbd8e3] underline text-[1rem] font-bold hover:scale-[1.15] transition-all duration-50 fixed left-1 top-20 sm:left-10 sm:top-28">
              <TfiAngleLeft className="mr-1" /> Retour
            </button>
        </div>
      )
}

export default BackButton;
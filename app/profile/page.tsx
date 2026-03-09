"use client"

import { useSecurityStore } from '@/lib/store/securityStore';
import { useUserStore } from '@/lib/store/userStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Profile() {

    const router = useRouter();
    const { jwt, setJwt } = useSecurityStore();  
    const { isConnected, firstName, name, email, removeUser } = useUserStore();


    const logout = () => {
        removeUser();
        setJwt('');
        router.push('/')
    };

    useEffect(() => {

        if (isConnected) {
            const eventSource = new EventSource('/api/updates')
        }

    }, [isConnected])

//   useEffect (() => {    
//     const fetchUsers = async () => {
//       if (user.familyId && seeUsers) {
//         const users = await getAllUsers(csrf, state.familyId);
//         setUsers(users.data)
//       };    
//     };
//     if (state.familyId) {
//       fetchUsers();
//     }
    
//   }, [seeUsers, state.familyId]);

//   const handleSubmit = async (value) => {
//     const id = state.id;
//     const name = value;
//     const result = await createFamily(csrf, id, name);
//     if (result) {
//       dispatch({ type: 'add family', payload: { family: value, familyId: result.data.id } })
//     }
//     return result.message;
//   };

    return (
        <div className="mt-28">
            <div className="flex flex-col gap-5 items-center text-[#dbd8e3]">
            <h2>Bienvenue {firstName}</h2>
            
            <div className="p-10 backdrop-blur-md font-bold rounded-lg ">
                <ul>
                <li>Nom: {name}</li>
                <li>Prenom: {firstName}</li>
                <li>Email: {email}</li>
                {/* {
                user.family === null || user.family === undefined ? (
                    <div className="flex flex-col gap-2 mt-5">
                    <button onClick={() => {setCreate(!create)}} className=" rounded-3xl bg-[#8e05c2] p-3 shadow-black shadow-md font-bold text-[#dbd8e3] duration-200 transition-transform hover:translate-x-2 hover:scale-[1.1] will-change-transform">Creer une famille</button> 
                    <button onClick={() => {setAdd(!add)}} className=" rounded-3xl bg-[#8e05c2] p-3 shadow-black shadow-md font-bold text-[#dbd8e3] duration-200 transition-transform hover:translate-x-2 hover:scale-[1.1] will-change-transform">Ajouter une famille</button> 
                    </div>
                )
                    : 
                    <li>Groupe: <button onClick={() => {setSeeUsers(!seeUsers)}}>{user.family}</button></li>
                    }
                    {user.isOwner && user.hash !== null && user.hash !== undefined && 
                    <div className="flex gap-5 items-center">
                        <li>{user.hash}</li>
                        <TfiExport />
                    </div>
                    }
                {
                    seeUsers && users.length > 0 &&
                    users.map(user => (
                        <li key={user.id}>{user.firstName}</li>
                    ))
                } */}
                </ul>
                {/* {
                create && (
                    <div>
                    <input type="text" name="" id="" placeholder="Entrer le nom de votre famille" onChange={(e) => {setInputValue(e.target.value)}} value={inputValue} />
                    <button type="submit" onClick={() => {
                        handleSubmit(inputValue);
                        setCreate(!create);
                        }}>Creer</button>
                    </div>
                )
                } */}
            </div>
            </div>
            <button className="ml-[45%] rounded-3xl bg-[#8e05c2] p-3 shadow-black shadow-md font-bold text-[#dbd8e3] duration-200 transition-transform hover:translate-x-2 hover:scale-[1.1] will-change-transform" onClick={logout}>Se deconnecter</button>
            
        </div>
    )
}

export default Profile;
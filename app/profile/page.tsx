'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/lib/store/userStore'
import { useSecurityStore } from '@/lib/store/securityStore'
import { useModalStore } from '@/lib/store/modalStore'
import { TfiExport } from 'react-icons/tfi'

type User = {
  id: number
  firstName: string
}

function Profile() {

  const router = useRouter()

  const {
    id,
    name,
    firstName,
    email,
    family,
    familyId,
    hash,
    isOwner,
    removeUser,
    addFamily
  } = useUserStore()

  const csrf = useSecurityStore((s) => s.csrf)

  const showModal = useModalStore((s) => s.showModal)

  const [seeUsers, setSeeUsers] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [create, setCreate] = useState(false)
  const [add, setAdd] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleDisconnect = async () => {
    const response = await fetchLogout(csrf)

    showModal(response.message, `A bientot ${firstName}`)

    removeUser()

    router.push('/')
  }

  useEffect(() => {

    const fetchUsers = async () => {
      if (familyId && seeUsers) {
        const users = await getAllUsers(csrf, familyId)
        setUsers(users.data)
      }
    }

    fetchUsers()

  }, [seeUsers, familyId, csrf])

  const handleSubmit = async () => {

    const result = await createFamily(csrf, id, inputValue)

    if (result) {
      addFamily({
        family: inputValue,
        familyId: result.data.id
      })
    }

    return result.message
  }

  return (
    <div className="mt-28">

      <div className="flex flex-col gap-5 items-center text-[#dbd8e3]">

        <h2>Bienvenue {firstName}</h2>

        <div className="p-10 backdrop-blur-md font-bold rounded-lg">

          <ul>

            <li>Nom: {name}</li>
            <li>Prenom: {firstName}</li>
            <li>Email: {email}</li>

            {!family ? (
              <div className="flex flex-col gap-2 mt-5">

                <button
                  onClick={() => setCreate(!create)}
                  className="rounded-3xl bg-[#8e05c2] p-3 shadow-black shadow-md font-bold text-[#dbd8e3] duration-200 transition-transform hover:translate-x-2 hover:scale-[1.1]"
                >
                  Creer une famille
                </button>

                <button
                  onClick={() => setAdd(!add)}
                  className="rounded-3xl bg-[#8e05c2] p-3 shadow-black shadow-md font-bold text-[#dbd8e3] duration-200 transition-transform hover:translate-x-2 hover:scale-[1.1]"
                >
                  Ajouter une famille
                </button>

              </div>
            ) : (
              <li>
                Famille:{' '}
                <button onClick={() => setSeeUsers(!seeUsers)}>
                  {family}
                </button>
              </li>
            )}

            {isOwner && hash && (
              <div className="flex gap-5 items-center">
                <li>{hash}</li>
                <TfiExport />
              </div>
            )}

            {seeUsers &&
              users.map((user) => (
                <li key={user.id}>{user.firstName}</li>
              ))}

          </ul>

          {create && (

            <div className="mt-4 flex gap-2">

              <input
                type="text"
                placeholder="Entrer le nom de votre famille"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="text-black p-2 rounded"
              />

              <button
                onClick={() => {
                  handleSubmit()
                  setCreate(false)
                }}
                className="bg-purple-700 px-4 rounded"
              >
                Creer
              </button>

            </div>

          )}

        </div>

      </div>

      <button
        className="ml-[45%] rounded-3xl bg-[#8e05c2] p-3 shadow-black shadow-md font-bold text-[#dbd8e3] duration-200 transition-transform hover:translate-x-2 hover:scale-[1.1]"
        onClick={handleDisconnect}
      >
        Se deconnecter
      </button>

    </div>
  )
}

export default Profile;
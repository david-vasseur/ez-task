"use client"

import { signAction } from '@/lib/actions/signAction';
import { ISign, SignSchema } from '@/lib/schema/signSchema';
import { useForm } from '@tanstack/react-form';
import { BiSend } from 'react-icons/bi';
import { toast } from 'sonner';

type SignFormProps = {
  setIsRegister: (value: boolean) => void
}

function SignForm({ setIsRegister }: SignFormProps) {

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            firstName: "",
            famillyName: ""
        } as ISign,
        validators: {
            onChange: SignSchema,
        },
        onSubmit: async ({ value }) => {
            try {
            const response = await signAction(value)
            if(response.error) {
                toast.error('ERREUR', {
                    description: "Une erreur est survenue",
                })
            } else {
                toast.success("Inscription reussi", {
                    description: "Vous pouvez dorénavent vous connecter à votre compte",
                })
                form.reset();
            }
            setIsRegister(true);
        } catch (error) {
            toast.error('ERREUR', {
                description: "Une erreur est survenue",
            })
        }       
        },
    })


    return (
        <form 
            className="space-y-4 p-10 border border-purple-500 rounded-2xl bg-linear-to-t from-gray-400/10 to-purple-700/10"
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
        >
            
            <form.Field
                name="email">
                {({ state, handleBlur, handleChange }) => (
                    <div>
                        <label className="sr-only">Votre email</label>
                        <input 
                            aria-invalid={
                                state.meta.errors.length > 0 && state.meta.isTouched
                            }
                            className="w-full rounded-md border border-gray-700 bg-transparent py-2 px-3 text-white placeholder-gray-500 placeholder-xs lg:placeholder-base focus:border-purple-500 focus:outline-none transition"
                            placeholder="Votre email"
                            value={state.value}
                            onBlur={handleBlur}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        {state.meta.errors.length > 0 && state.meta.isTouched ? (
                            <p 
                                className="text-red-500 font-semibold text-xs">
                                    {state.meta.errors[0]?.message}
                            </p>
                        ) : null
                        }
                    </div>
                    
                )}
            </form.Field>

            <form.Field
                name="password">
                {({ state, handleBlur, handleChange }) => (
                    <div>
                        <label className="sr-only">Votre mot de passe</label>
                        <input 
                            aria-invalid={
                                state.meta.errors.length > 0 && state.meta.isTouched
                            }
                            className="w-full rounded-md border border-gray-700 bg-transparent py-2 px-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition"
                            placeholder="Mot de passe"
                            value={state.value}
                            onBlur={handleBlur}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        {state.meta.errors.length > 0 && state.meta.isTouched ? (
                            <p 
                                className="text-red-500 font-semibold text-xs">
                                    {state.meta.errors[0]?.message}
                            </p>
                        ) : null
                        }
                    </div>
                )}
            </form.Field>

            <form.Field
                name="confirmPassword">
                {({ state, handleBlur, handleChange }) => (
                    <div>
                        <label className="sr-only">Confirmer le mot de passe</label>
                        <input 
                            aria-invalid={
                                state.meta.errors.length > 0 && state.meta.isTouched
                            }
                            className="w-full rounded-md border border-gray-700 bg-transparent py-2 px-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition"
                            placeholder="Confirmer le mot de passe "
                            value={state.value}
                            onBlur={handleBlur}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        {state.meta.errors.length > 0 && state.meta.isTouched ? (
                            <p 
                                className="text-red-500 font-semibold text-xs">
                                    {state.meta.errors[0]?.message}
                            </p>
                        ) : null
                        }
                    </div>
                )}
            </form.Field>

            <form.Field
                name="name">
                {({ state, handleBlur, handleChange }) => (
                    <div>
                        <label className="sr-only">Votre nom</label>
                         <input 
                            aria-invalid={
                                state.meta.errors.length > 0 && state.meta.isTouched
                            }
                            className="w-full rounded-md border border-gray-700 bg-transparent py-2 px-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition"
                            placeholder="Votre nom"
                            value={state.value}
                            onBlur={handleBlur}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        {state.meta.errors.length > 0 && state.meta.isTouched ? (
                            <p 
                                className="text-red-500 font-semibold text-xs">
                                    {state.meta.errors[0]?.message}
                            </p>
                        ) : null
                        }
                    </div>
                )}
            </form.Field>
            
            <form.Field
                name="firstName">
                {({ state, handleBlur, handleChange }) => (
                    <div>
                        <label className="sr-only">Votre prénom</label>
                        <input 
                            aria-invalid={
                                state.meta.errors.length > 0 && state.meta.isTouched
                            }
                            className="w-full rounded-md border border-gray-700 bg-transparent py-2 px-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition"
                            placeholder="Votre prénom"
                            value={state.value}
                            onBlur={handleBlur}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        {state.meta.errors.length > 0 && state.meta.isTouched ? (
                            <p 
                                className="text-red-500 font-semibold text-xs">
                                    {state.meta.errors[0]?.message}
                            </p>
                        ) : null
                        }
                    </div>
                )}
            </form.Field>     

            <form.Field
                name="famillyName"
            >
            {({ state, handleBlur, handleChange }) => (
                <div>
                    <label className="sr-only">Votre groupe</label>
                    <input 
                            aria-invalid={
                                state.meta.errors.length > 0 && state.meta.isTouched
                            }
                            className="w-full rounded-md border border-gray-700 bg-transparent py-2 px-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition"
                            placeholder="Le nom de votre groupe"
                            value={state.value}
                            onBlur={handleBlur}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        {state.meta.errors.length > 0 && state.meta.isTouched ? (
                            <p 
                                className="text-red-500 font-semibold text-xs">
                                    {state.meta.errors[0]?.message}
                            </p>
                        ) : null
                        }
                </div>
            )}
            </form.Field>       

            <form.Subscribe 
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                // eslint-disable-next-line react/no-children-prop
                children={([canSubmit, isSubmitting]) => (
                    <button 
                        type="submit" 
                        disabled={!canSubmit || isSubmitting}
                        className="inline-flex items-center justify-center space-x-2 rounded-md bg-purple-600 px-6 py-3 font-semibold text-black hover:bg-purple-700 transition cursor-pointer" 
                    >
                    {isSubmitting ? "..." : (
                        <span className="flex items-center">
                            S'inscrire
                            <BiSend className="ml-2" />
                        </span>
                    )}
                </button>
                )}            
            >    
            </form.Subscribe>
        </form>
    )

}

export default SignForm
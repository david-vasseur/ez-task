"use client"

import { loginAction } from '@/lib/actions/loginAction';
import { ILogin, LoginSchema } from '@/lib/schema/loginSchema';
import { useUserStore } from '@/lib/store/userStore';
import { useForm } from '@tanstack/react-form';
import { BiSend } from 'react-icons/bi';
import { toast } from 'sonner';

function LoginForm() {

    const { addUser } = useUserStore();

    const form = useForm({
            defaultValues: {
                email: "",
                password: "",
            } as ILogin,
            validators: {
                onChange: LoginSchema,
            },
            onSubmit: async ({ value }) => {
                try {
                    const response = await loginAction(value)
                    if(response.error) {
                        toast.error('ERREUR', {
                            description: "Une erreur est survenue",
                        })
                    } else {
                        toast.success("Connection reussi", {
                            description: "Vous pouvez dorénavent ajouter des taches",
                        })
                        addUser({
                            ...response.data.user,
                            token: response.data.token,
                        });

                        form.reset();
                    }
                } catch (error) {
                    toast.error('ERREUR', {
                        description: "Une erreur est survenue",
                    })
                }       

            },
        })

    return (
        <form 
            className="space-y-4 p-10 border border-orange-500 rounded-2xl bg-linear-to-t from-gray-400/10 to-orange-700/10"
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
                            className="w-full rounded-md border border-gray-700 bg-transparent py-2 px-3 text-white placeholder-gray-500 placeholder-xs lg:placeholder-base focus:border-orange-500 focus:outline-none transition"
                            placeholder="Nom et prénoms"
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
                            className="w-full rounded-md border border-gray-700 bg-transparent py-2 px-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition"
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

            <form.Subscribe 
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                            // eslint-disable-next-line react/no-children-prop
                            children={([canSubmit, isSubmitting]) => (
                                <button 
                                    type="submit" 
                                    disabled={!canSubmit || isSubmitting}
                                    className="inline-flex items-center justify-center space-x-2 rounded-md bg-orange-600 px-6 py-3 font-semibold text-black hover:bg-orange-700 transition cursor-pointer" 
                                >
                                {isSubmitting ? "..." : (
                                    <span className="flex items-center">                                        
                                        Se connecter
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

export default LoginForm
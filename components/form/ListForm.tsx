"use client"

import { addTreeAction } from '@/lib/actions/listAction';
import { IInput, InputSchema } from '@/lib/schema/inputSchema';
import { useForm } from '@tanstack/react-form';
import { BiSend } from 'react-icons/bi';
import { toast } from 'sonner';

interface IList {
    familyId: number,
    token: string
}

function ListForm({ familyId, token }: IList) {

    const form = useForm({
            defaultValues: {
                name: "",
            } as IInput,
            validators: {
                onChange: InputSchema,
            },
            onSubmit: async ({ value }) => {
                try {
                    const response = await addTreeAction(value, familyId, token)
                    if(response.error) {
                        toast.error('ERREUR', {
                            description: "Une erreur est survenue",
                        })
                    } else {
                        toast.success("Liste ajoutée", {
                            description: "Votre liste a été ajouté avec succes",
                        })
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
            className="flex space-y-4 w-[90vw] xl:w-[60vw] p-10 border rounded-2xl"
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
        >
            
            <form.Field
                name="name">
                {({ state, handleBlur, handleChange }) => (
                    <div>
                        <label className="sr-only">Le nom de votre liste</label>
                        <input 
                            aria-invalid={
                                state.meta.errors.length > 0 && state.meta.isTouched
                            }
                            className="w-full rounded-md border border-gray-700 bg-transparent py-2 px-3 text-white placeholder-gray-500 placeholder-xs lg:placeholder-base focus:border-purple-500 focus:outline-none transition"
                            placeholder="Le nom de votre liste"
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
                            Valider
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

export default ListForm;
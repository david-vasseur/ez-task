"use client"

import { addTreeAction } from '@/lib/actions/listAction';
import { IInput, InputSchema } from '@/lib/schema/inputSchema';
import { useForm } from '@tanstack/react-form';
import gsap from 'gsap';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { BiCheck, BiSend } from 'react-icons/bi';
import { toast } from 'sonner';

interface IList {
    familyId: number,
    token: string
    open: boolean
}

function ListForm({ familyId, token, open }: IList) {

    const containerRef = useRef<HTMLFormElement>(null);

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        gsap.set(containerRef.current, {
            opacity: 0,
            y: -50
        });
    }, []);

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

    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const el = containerRef.current;

        const isDesktop = window.innerWidth >= 1280;
        const targetWidth = isDesktop ? "40%" : "80%";

        const tl = gsap.timeline({ paused: true });

        tl.fromTo(el,
            { opacity: 0, y: -50, width: el.offsetHeight },
            { opacity: 1, y: 0, width: el.offsetHeight, duration: 0.2, ease: "power2.out" }
        )
        .to(el, {
            width: targetWidth,
            duration: 0.4,
            ease: "back.out"
        });

        tlRef.current = tl;

    }, []);

    useEffect(() => {
        if (!tlRef.current) return;

        if (open) {
            tlRef.current.play();
        } else {
            tlRef.current.reverse();
        }
    }, [open]);

    return (
        <form 
            ref={containerRef}
            className="relative w-[80vw] xl:w-[50vw] h-15 opacity-0 -translate-y-12"
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
        >
            
            <form.Field
                name="name">
                {({ state, handleBlur, handleChange }) => (
                    <div className="relative h-full w-full">
                        <label className="sr-only">Le nom de votre liste</label>
                        <input 
                            aria-invalid={
                                state.meta.errors.length > 0 && state.meta.isTouched
                            }
                            className="w-full h-full rounded-full border border-gray-700 bg-transparent py-2 px-3 text-white placeholder-gray-500 placeholder-xs lg:placeholder-base focus:border-purple-500 focus:outline-none transition"
                            placeholder="Le nom de votre liste"
                            value={state.value}
                            onBlur={handleBlur}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        {state.meta.errors.length > 0 && state.meta.isTouched ? (
                            <p 
                                className="absolute left-5 text-red-500 font-semibold text-xs">
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
                        className="
                            absolute right-1 top-1/2 -translate-y-1/2
                            flex items-center justify-center
                            h-14 w-14
                            rounded-full
                            bg-radial from-green-800/60 to-green-600/80 from-5% to-80%
                            text-zinc-100
                            hover:bg-purple-700
                            cursor-pointer
                        ">
                    {isSubmitting ? "..." : (
                        <BiCheck className="text-4xl xl:text-6xl" />
                       
                    )}
                </button>
                )}            
            >    
            </form.Subscribe>
        </form>
    )
}

export default ListForm;
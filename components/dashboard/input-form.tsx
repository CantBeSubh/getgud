'use client'

import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Plus } from 'lucide-react';

const formSchema = z.object({
    name: z.string().min(3).max(20)
});


type FormValueType = z.infer<typeof formSchema>;

export function InputForm(
    { onSubmit, placeholder }
        :
        { placeholder: string, onSubmit: (name: string) => void }) {
    const form = useForm<FormValueType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        }
    });

    const HandleSubmit = (data: FormValueType) => {
        const { name } = data;
        onSubmit(name);
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(HandleSubmit)} className="flex space-x-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder={placeholder}
                                    {...field}
                                    className='
                                        rounded-xl
                                        border-2
                                        border-[#37394a]
                                        border-opacity-0
                                        outline-none 
                                        text-[#c4c3ca]
                                        bg-[#37394a]
                                        transition-all
                                        duration-200
                                        box-shadow-[0 4px 8px 0 rgba(21, 21, 21, 0.2)]
                                        focus:border-2 focus:border-[#ffeba7]
                                    '
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <button type="submit" >
                    {/* <Plus size={24} /> */}
                </button>
            </form>
        </Form>
    )
}
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { DateTime } from 'luxon'
import { Entry } from '@/app/interfaces/entry'
import { ToastAction } from '@/components/ui/toast'

const FormSchema = z.object({
   text: z
      .string()
      .min(5, {
         message: 'Your text must be at least 5 characters.',
      })
      .max(1600, {
         message: 'Bio must not be longer than 1600 characters.',
      }),
})

export function EntryForm() {
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
   })

   async function submitEntry(entry: Entry): Promise<void> {
      const response = await fetch('/api/entries', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(entry),
      })

      if (!response.ok) {
         throw new Error(`Request failed with status ${response.status}`)
      }
   }

   async function onSubmit(data: z.infer<typeof FormSchema>) {
      const entry: Entry = { text: data.text, date: new Date() }
      try {
         await submitEntry(entry)

         // Success toast with form data
         toast({
            title: 'Form submitted',
            description: (
               <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">{data.text}</code>
               </pre>
            ),
         })

         // Reset form once successful.
         form.reset()
      } catch (error) {
         // Error toast will be handled by submitEntry.
         toast({
            variant: 'destructive',
            title: 'Submission failed',
            description: 'Please try again.',
            action: (
               <ToastAction
                  altText="Try again"
                  onClick={async (): Promise<void> => {
                     await onSubmit(data) // Retry submission.
                  }}
               >
                  Try again
               </ToastAction>
            ),
         })
      }
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
               control={form.control}
               name="text"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Your text</FormLabel>
                     <FormControl>
                        <Textarea
                           placeholder="Tell us a little bit about your day! 😁"
                           className="resize-none"
                           {...field}
                        />
                     </FormControl>
                     <FormDescription>
                        This text will be submitted
                        for {DateTime.fromJSDate(new Date(Date.now())).toFormat('MMMM dd, yyyy, HH:MM')}
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit">Submit</Button>
         </form>
      </Form>
   )
}

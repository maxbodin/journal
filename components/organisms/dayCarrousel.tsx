import * as React from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Entry } from '@/app/interfaces/entry'
import { Day } from '@/app/interfaces/day'
import { DateTime } from 'luxon'
import { useData } from '@/app/providers/dataProvider'

export function DayCarrousel() {
   const { days } = useData()

   return (
      <Carousel dir="ltr" opts={{
         direction: 'ltr',
         align: 'center',
         containScroll: false,
         dragFree: true,
         loop: false,
      }}
                className="w-full max-w-6xl">
         <CarouselContent dir="ltr" className="-ml-1">
            {days.map((day: Day, index: number) => (
               <CarouselItem key={index} className="basis-1/3">
                  <div className="p-1">
                     <Card>
                        <CardContent className="flex flex-col items-center justify-center p-6">
                           <span
                              className="text-2xl font-semibold mb-4">{DateTime.fromJSDate(day.date).toFormat('MMMM dd, yyyy')}</span>
                           <ul className="list-disc ml-5">
                              {day.entries.map((entry: Entry) => (
                                 <li key={entry.id} className="mb-2">
                                    <strong>{DateTime.fromJSDate(entry.date).toFormat('HH:MM')}</strong> - {entry.text}
                                 </li>
                              ))}
                           </ul>
                        </CardContent>
                     </Card>
                  </div>
               </CarouselItem>
            ))}
         </CarouselContent>
         <CarouselPrevious />
         <CarouselNext />
      </Carousel>
   )
}

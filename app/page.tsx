'use client'

import { EntryForm } from '@/components/organisms/entryForm'
import { DayCarrousel } from '@/components/organisms/dayCarrousel'
import { DataProvider } from '@/app/providers/dataProvider'
import { ActionsBar } from '@/components/organisms/actionsBar'
import { VisuBar } from '@/components/organisms/visuBar'


export default function Home() {
   return (
      <main className="flex flex-col items-center p-10 m-10">
         <VisuBar />
         <DataProvider>
            <ActionsBar />
            <DayCarrousel />
         </DataProvider>
         <EntryForm />
      </main>
   )
}

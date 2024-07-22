import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Entry } from '@/app/interfaces/entry'
import { Day } from '@/app/interfaces/day'

interface DataContextValue {
   entries: Entry[]
   setEntries: React.Dispatch<React.SetStateAction<Entry[]>>
   days: Day[]
   setDays: React.Dispatch<React.SetStateAction<Day[]>>
}

// Create data context..
const DataContext = createContext<DataContextValue | null>(null)

// Custom hook to access data context.
export function useData(): DataContextValue {
   const context = useContext(DataContext)
   if (!context) {
      throw new Error(
         'useData must be used within a DataProvider',
      )
   }
   return context
}

// Provider component.
export function DataProvider({ children }: { children: ReactNode }) {
   const [entries, setEntries] = useState<Entry[]>([])

   const [days, setDays] = useState<Day[]>([])

   const value: DataContextValue = {
      entries: entries,
      setEntries: setEntries,
      days: days,
      setDays: setDays,
   }

   return (
      <DataContext.Provider value={value}>
         {children}
      </DataContext.Provider>
   )
}

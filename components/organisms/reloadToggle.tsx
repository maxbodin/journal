import * as React from 'react'
import { useEffect, useState } from 'react'
import { showNotification } from '@/lib/notification'
import { Entry } from '@/app/interfaces/entry'
import { Day } from '@/app/interfaces/day'
import { useData } from '@/app/providers/dataProvider'
import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Loader2 } from 'lucide-react'

export function ReloadToggle() {
   const [loading, setLoading] = useState<boolean>(false)

   const { setEntries, setDays } = useData()
   const groupEntriesByDay = (entries: Entry[]): Day[] => {
      const daysMap = new Map<string, Day>()

      entries.forEach((entry: Entry): void => {
         const dayString: string = entry.date.toISOString().split('T')[0] // Extract date part as YYYY-MM-DD
         if (!daysMap.has(dayString)) {
            daysMap.set(dayString, { date: new Date(dayString), entries: [] })
         }
         daysMap.get(dayString)?.entries.push(entry)
      })

      // Convert map to array and sort by date
      return Array.from(daysMap.values()).sort((a, b) => b.date.getTime() - a.date.getTime())
   }

   const fetchEntries = async () => {
      setLoading(true)
      const res: Response = await fetch('/api/entries')
      const data = await res.json()

      // Ensure entries dates have date.
      const entries = data.entries.map((entry: any) => ({
         ...entry,
         date: new Date(entry.date),
      }))

      setEntries(entries)
      setDays(groupEntriesByDay(entries))

      showNotification('Carrousel updated!', 'You are currently seeing all the entries!')
      setLoading(false)
   }

   useEffect(() => {
      fetchEntries()
   }, [])

   return (
      <Button onClick={fetchEntries} variant="outline" size="icon" disabled={loading}>
         {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> :
            <>
               <ReloadIcon
                  className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
               <span className="sr-only">Toggle theme</span>
            </>}

      </Button>
   )
}

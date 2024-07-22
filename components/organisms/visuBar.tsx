import * as React from 'react'
import { Button } from '@/components/ui/button'

export function VisuBar() {
   return (
      <div className="flex flex-row absolute top-0 left-1/2 transform -translate-x-1/2 p-4 space-x-4">
         <Button variant="ghost">Carrousel</Button>
         <Button variant="ghost">Table</Button>
         <Button variant="ghost">Calendar</Button>
      </div>
   )
}


import { ReloadToggle } from '@/components/organisms/reloadToggle'
import { ThemeToggle } from '@/components/ui/themeToggle'

export function ActionsBar() {
   return (
      <div className="flex flex-row absolute top-0 left-0 p-4 w-32 justify-evenly">
         <ThemeToggle />
         <ReloadToggle />
      </div>
   )
}
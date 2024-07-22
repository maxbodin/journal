export const showNotification = (title: string = 'New notification from your journal! 🔔', body: string, tag: string = 'important', callback: () => void = () => {
   console.log('Notification Clicked')
}): void => {
   if (Notification.permission === 'granted') {
      new Notification(title, {
         body: body,
         tag: tag,
         silent: false,
         //TODO badge?: string;
         //TODO icon?: string;
      }).onclick = callback
   } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
         if (permission === 'granted') {
            new Notification(title, {
               body: body,
               tag: tag,
               silent: false,
               //TODO badge?: string;
               //TODO icon?: string;
            }).onclick = callback
         }
      })
   }
}


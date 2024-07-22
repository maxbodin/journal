import { prisma } from '@/lib/prisma'
import { Entry } from '@/app/interfaces/entry'


/**
 * GET Route to get all entries.
 * @constructor
 */
export async function GET(request: Request) {
   try {
      // Fetch entries from Prisma.
      const entries: Entry[] = await prisma.entry.findMany()
      return Response.json({ entries })
   } catch (error) {
      console.error('Error fetching entries:', error)
      return Response.error()
   }
}

/**
 * POST Route to create an entry.
 * @constructor
 * @param request
 */
export async function POST(request: Request) {
   try {
      const data: Entry = await request.json()
      const newEntry: Entry = await prisma.entry.create({
         data: {
            text: data.text,
            date: data.date,
         },
      })
      return Response.json({ entry: newEntry })
   } catch (error) {
      console.error('Error creating entry:', error)
      return Response.error()
   }
}

/* TODO WIP


export async function findByText(text: string) {
   try {
      const entries = await prisma.entry.findMany({
         where: {
            text: {
               contains: text,
            },
         },
      })
      return Response.json({ entries })
   } catch (error) {
      console.error('Error finding entry by text:', error)
      return Response.error()
   }
}


export async function findByDate(startDate, endDate) {
   try {
      const entries = await prisma.entry.findMany({
         where: {
            date: {
               gte: new Date(startDate),
               lte: new Date(endDate),
            },
         },
      })
      return Response.json({ entries })
   } catch (error) {
      console.error('Error finding entry by date range:', error)
      return Response.error()
   }
}


export async function update(id, data) {
   try {
      const updatedEntry = await prisma.entry.update({
         where: { id },
         data,
      })
      return Response.json({ entry: updatedEntry })
   } catch (error) {
      console.error('Error updating entry:', error)
      return Response.error()
   }
}

export async function DELETE(id) {
   try {
      const deletedEntry = await prisma.entry.delete({
         where: { id },
      })
      return Response.json({ entry: deletedEntry })
   } catch (error) {
      console.error('Error deleting entry:', error)
      return Response.error()
   }
}
*/

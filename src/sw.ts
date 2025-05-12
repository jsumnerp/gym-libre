/// <reference lib="webworker" />

import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { openDB, deleteDB } from 'idb'
import {
  type GymLibreDB,
  type GymLibreDatabase,
  type Workout,
} from '@/types/db'

declare let self: ServiceWorkerGlobalScope

// Clean up old caches
cleanupOutdatedCaches()

// Handle skip waiting message
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// Initialize IndexedDB
async function initDB() {
  let db: GymLibreDatabase | undefined
  try {
    // Delete existing database first just to keep versions number at one during initial dev
    await deleteDB('gym-libre-db')
    console.log('Deleted existing database')

    db = await openDB<GymLibreDB>('gym-libre-db', 1, {
      upgrade(db, oldVersion) {
        console.log('Upgrade', oldVersion)
        switch (oldVersion) {
          case 0:
            console.log('Creating new database')
          // eslint-disable-next-line no-fallthrough
          case 1:
            console.log('Creating new workouts store')

            // eslint-disable-next-line no-case-declarations
            const store = db.createObjectStore('workouts', {
              keyPath: 'id',
              autoIncrement: true,
            })

            store.createIndex('by-date', 'date')
        }
      },
      blocked() {
        console.log('Database blocked')
      },
      blocking() {
        console.log('Database blocking')
      },
      terminated() {
        console.log('Database terminated')
      },
    })

    console.log('Version:', db.version)

    // Clear existing objects and add sample exercises
    try {
      const tx = db.transaction('workouts', 'readwrite')
      const store = tx.objectStore('workouts')

      // Delete all existing objects
      const keys = await store.getAllKeys()
      await Promise.all(keys.map((key) => store.delete(key)))
      console.log('Existing objects cleared')

      const workouts: Workout[] = [
        {
          name: 'Day 1',
          exercises: [
            {
              name: 'Squat (T1)',
              sets: [
                { set: 1, kg: 50, target: '3', reps: 3 },
                { set: 2, kg: 50, target: '3', reps: 3 },
                { set: 3, kg: 50, target: '3', reps: 3 },
                { set: 4, kg: 50, target: '3', reps: 3 },
                { set: 5, kg: 50, target: '3+', reps: 10 },
              ],
            },
            {
              name: 'Bench Press (T2)',
              sets: [
                { set: 1, kg: 20, target: '10', reps: 10 },
                { set: 2, kg: 20, target: '10', reps: 10 },
                { set: 3, kg: 20, target: '10', reps: 10 },
              ],
            },
            {
              name: 'Lat Pulldowns (T3)',
              sets: [
                { set: 1, kg: 30, target: '15', reps: 15 },
                { set: 2, kg: 30, target: '15', reps: 15 },
                { set: 3, kg: 30, target: '15+', reps: 15 },
              ],
            },
          ],
          date: '2025-05-05T09:00:00.000Z',
        },
        {
          name: 'Day 2',
          exercises: [
            {
              name: 'OHP (T1)',
              sets: [
                { set: 1, kg: 25, target: '3', reps: 3 },
                { set: 2, kg: 25, target: '3', reps: 3 },
                { set: 3, kg: 25, target: '3', reps: 3 },
                { set: 4, kg: 25, target: '3', reps: 3 },
                { set: 5, kg: 25, target: '3+', reps: 10 },
              ],
            },
            {
              name: 'Deadlift (T2)',
              sets: [
                { set: 1, kg: 35, target: '10', reps: 10 },
                { set: 2, kg: 35, target: '10', reps: 10 },
                { set: 3, kg: 35, target: '10', reps: 10 },
              ],
            },
            {
              name: 'Cable Row (T3)',
              sets: [
                { set: 1, kg: 20, target: '15', reps: 15 },
                { set: 2, kg: 20, target: '15', reps: 15 },
                { set: 3, kg: 20, target: '15+', reps: 15 },
              ],
            },
          ],
          date: '2025-05-07T09:00:00.000Z',
        },
        {
          name: 'Day 3',
          exercises: [
            {
              name: 'Bench Press (T1)',
              sets: [
                { set: 1, kg: 35, target: '3', reps: 3 },
                { set: 2, kg: 35, target: '3', reps: 3 },
                { set: 3, kg: 35, target: '3', reps: 3 },
                { set: 4, kg: 35, target: '3', reps: 3 },
                { set: 5, kg: 35, target: '3+', reps: 10 },
              ],
            },
            {
              name: 'Squat (T2)',
              sets: [
                { set: 1, kg: 20, target: '10', reps: 10 },
                { set: 2, kg: 20, target: '10', reps: 10 },
                { set: 3, kg: 20, target: '10', reps: 10 },
              ],
            },
            {
              name: 'Lat Pulldowns (T3)',
              sets: [
                { set: 1, kg: 30, target: '15', reps: 15 },
                { set: 2, kg: 30, target: '15', reps: 15 },
                { set: 3, kg: 30, target: '15+', reps: 25 },
              ],
            },
          ],
          date: '2025-05-09T09:00:00.000Z',
        },
        {
          name: 'Day 4',
          exercises: [
            {
              name: 'Deadlift (T1)',
              sets: [
                { set: 1, kg: 85, target: '3', reps: 3 },
                { set: 2, kg: 85, target: '3', reps: 3 },
                { set: 3, kg: 85, target: '3', reps: 3 },
                { set: 4, kg: 85, target: '3', reps: 3 },
                { set: 5, kg: 85, target: '3+', reps: 5 },
              ],
            },
            {
              name: 'OHP (T2)',
              sets: [
                { set: 1, kg: 10, target: '10', reps: 10 },
                { set: 2, kg: 10, target: '10', reps: 10 },
                { set: 3, kg: 10, target: '10', reps: 10 },
              ],
            },
            {
              name: 'Cable Row (T3)',
              sets: [
                { set: 1, kg: 20, target: '15', reps: 15 },
                { set: 2, kg: 20, target: '15', reps: 15 },
                { set: 3, kg: 20, target: '15+', reps: 15 },
              ],
            },
          ],
          date: '2025-05-10T09:00:00.000Z',
        },
      ]

      for (const workout of workouts) {
        await store.add(workout)
      }
      await tx.done
      console.log('Sample exercises added to database')
    } catch (txError) {
      console.error('Transaction error:', txError)
    }

    console.log('Database initialized in service worker')
  } catch (error) {
    console.error('Failed to initialize database in service worker:', error)
  } finally {
    if (db) {
      db.close()
    }
  }
}

// Initialize database during installation
self.addEventListener('install', (event) => {
  event.waitUntil(initDB())
})

// Precache all assets generated by vite
precacheAndRoute(self.__WB_MANIFEST)

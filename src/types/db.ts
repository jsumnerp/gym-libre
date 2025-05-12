import { type DBSchema, type IDBPDatabase } from 'idb'

export interface Set {
  set: number
  kg: number
  target: string
  reps: number
}

export interface Exercise {
  id?: number
  name: string
  sets: Set[]
}

export interface Workout {
  id?: number
  name: string
  exercises: Exercise[]
  date: string
}

export interface GymLibreDB extends DBSchema {
  workouts: {
    key: number
    value: Workout
    indexes: {
      'by-date': string
    }
  }
}

export type GymLibreDatabase = IDBPDatabase<GymLibreDB>

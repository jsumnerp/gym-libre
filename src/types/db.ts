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
  date: string
}

export interface GymLibreDB extends DBSchema {
  exercises: {
    key: number
    value: Exercise
    indexes: {
      'by-date': string
    }
  }
}

export type GymLibreDatabase = IDBPDatabase<GymLibreDB>

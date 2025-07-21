export interface FaqInfo {
  no: number
  title: string
  content: string
  pick: boolean
  type: string
  createdDt: Date
  updatedDt: Date
  deletedDt?: Date | null
  deletedYn: boolean
}
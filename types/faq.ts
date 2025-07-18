export interface Faq {
  no: number
  title: string
  content: string
  pick: boolean
  type: string
  createdDt: Date
  updatedDt: Date
  modifiedDt?: Date
  deletedDt?: Date
  deletedYn: boolean
}
export interface Contact {
  no: number
  title: string
  content: string
  type: string
  userName: string
  userEmail: string
  phoneNumber: string
  answer: string
  createdDt: Date
  updatedDt: Date
  deletedDt?: Date
  deletedYn: boolean
}
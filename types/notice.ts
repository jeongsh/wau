
export interface NoticeInfo {
  no: number
  title: string
  content: string
  pick: boolean
  createdDt: Date 
  updatedDt: Date
  deletedDt?: Date | null
  deletedYn: boolean
}
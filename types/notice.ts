
export interface NoticeInfo {
  no: number
  title: string
  content: string
  pick: boolean
  createdDt: Date
  updatedDt: Date
  modifiedDt?: Date | null
  deletedDt?: Date | null
  deletedYn: boolean
}
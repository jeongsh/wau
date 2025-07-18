
export interface NoticeInfo {
  no: number
  title: string
  content: string
  pick: boolean
  createdDt: Date | null
  updatedDt: Date | null
  modifiedDt?: Date | null
  deletedDt?: Date | null
  deletedYn: boolean
}
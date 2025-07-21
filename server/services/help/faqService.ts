import { selectAllFaq, getFaq, createFaq } from "~/server/repositories/help/faqRepository"

// 조회
export const getFaqs = async () => {
  return await selectAllFaq()
}

export const getFaqById = async (id: number) => {
  return await getFaq(id)
}

export const makeFaq = async (data: { title: string; content: string; pick: boolean; type: string }) => {
  return await createFaq(data)
}
import { selectAllContact, getContact, createContact, updateContactAnswer } from "~/server/repositories/help/contactRepository"

export const getContacts = async () => {
  return await selectAllContact()
}

export const getContactById = async (id: number) => {
  return await getContact(id)
}

export const makeContact = async (data: { 
  title: string; 
  content: string; 
  type: string; 
  userName: string; 
  userEmail: string; 
  phoneNumber?: string; 
}) => {
  return await createContact(data)
}

export const updateAnswer = async (contactNo: number, answer: string) => {
  return await updateContactAnswer(contactNo, answer)
}

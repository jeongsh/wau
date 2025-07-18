import { getNotice } from '~/server/api/help/notice'

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const no = query.no;
  return await getNotice(Number(no));
})
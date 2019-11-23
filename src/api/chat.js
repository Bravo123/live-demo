import { ajaxGet } from '../lib/ajax';
export function getChatData(params) {
  return ajaxGet('chat/list', params);
}

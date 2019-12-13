import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: string[] = [];
  /*用于往缓存里面添加一条信息 */
  add(message: string) {
    this.messages.push(message);
  }
  /*用于清空缓存 */
  clear() {
    this.messages = [];
  }
}

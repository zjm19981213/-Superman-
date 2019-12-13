import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  /*添加一个共有的messageService属性参数
  并且必须是共有的，因为将会在模板绑定它
  (Angular只会绑定到组件的公共属性) */
  constructor(public messageService: MessagesService) { }

  ngOnInit() {
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() text!: string;
  @Input() icon?: string;
  @Input() color!: string;
  @Input() show!: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}

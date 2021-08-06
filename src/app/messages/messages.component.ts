import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from './messages.model';
import { MessageService } from './messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  customerId: number;
  messages: Note[] = [];
  isLoading = false;
  postSuccess = false;
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private msgService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerId = +this.route.snapshot.params['id'];
    this.isLoading = true;
    this.msgService.getNoteById(this.customerId).subscribe((data: Note[]) => {
      this.messages = data;
      this.isLoading = false;
    });
  }

  createMessage(form: NgForm) {
    const value = form.value;
    let msg = new Note();
    msg.customerId = this.customerId;
    msg.text = value.text;
    this.msgService.createNote(msg).subscribe((data: Note[]) => {
      this.postSuccess = true;
      this.successMessage = 'Заметка успешно создана!';
      setTimeout(() => {
        this.router.navigate(['/customers-list']);
      }, 700);
    });
  }
}

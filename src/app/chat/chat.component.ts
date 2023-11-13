import { Component, Input, OnInit } from '@angular/core';
import { ConversationService } from '../services/conversation.service';
import { MessageService } from '../services/message.service';
import { CookieService } from 'ngx-cookie-service';
import { OnCallService } from '../services/on-call.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() idAsked: any;
  messages: any[] = [];
  conversation: any;
  currentUserUuid: any;
  newMessage: string = '';
  onCallsWeek: any[] = [];
  onCallsWeekParticipant: any[] = [];
  personNoIncharge: any[]=[]
  idUser: any[] = [];
  constructor(
    private onCallService: OnCallService,
    private conversationService: ConversationService,
    private messageService: MessageService,
    private cookieService: CookieService,
    private service: UsersService
  ) {}

  ngOnInit(): void {
    this.currentUserUuid = this.cookieService.get('user_uuid');
    this.getOnCallNextWeek();
    this.fetchConversationByAsked();
  }

  private fetchConversationByAsked(): void {
    if (this.idAsked) {
      this.conversationService.findConversationByAsked(this.idAsked).subscribe(
        (data) => {
          this.conversation = data;
          console.log(this.conversation);
          this.fetchMessagesConversation(data.convers_uuid);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  private fetchMessagesConversation(conversationUuid: string): void {
    this.messages=[];
    this.messageService.findMessagesByConversation(conversationUuid).subscribe(
      (data) => {
        this.messages = data;
        console.log(this.messages);
        this.messages.forEach((oncall) => {
          this.idUser.push(oncall.user_uuid);
        });
        this.genrerateIconOtherUser(this.idUser);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  genrerateIconOtherUser(id: any) { 
    this.onCallsWeekParticipant = [];
    [...new Set(id)].forEach((userId: any) => {
      console.log('current' + userId);
      this.service.findUserByid(userId).subscribe(
        (user) => {
          this.onCallsWeekParticipant.push(user);
          this.onCallsWeekParticipant = [
            ...new Set(this.onCallsWeekParticipant),
            
          ]; 
           this.filterpersonwithnocharge();
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }

  filterpersonwithnocharge(){
      this.personNoIncharge=[];
    this.onCallsWeek.forEach(dat => {
       
        
        this.onCallsWeekParticipant.forEach(user=> {
          this.personNoIncharge.push(dat);
          if (user.user_uuid !=dat.user_uuid){ this.personNoIncharge.push(user);
        this.personNoIncharge.push(dat);
        this.personNoIncharge = [...new Set(this.personNoIncharge)];
       }
        })
      });
       console.log(this.personNoIncharge);
  }
/*
  combineAll(){
     this.personNoIncharge.forEach((message) => {
       this.personNoIncharge.forEach((dat) => {
         this.personNoIncharge.push(message + dat);
       });
     });
  }
*/
  createMessage(message: any) {
    this.messageService.createMessage(message).subscribe(
      (response) => {
        this.newMessage = '';

        this.fetchMessagesConversation(this.conversation.convers_uuid);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }

    const user_uuid = this.cookieService.get('user_uuid');
    const message: any = {
      message_text: this.newMessage,
      convers_uuid: this.conversation.convers_uuid,
      support_type_id: 3,
      user_uuid,
    };

    this.createMessage(message);
  }

  getImageSource(supportTypeId: number): string {
    if (supportTypeId === 3) {
      return 'assets/icons/user.png';
    } else if (supportTypeId === 4) {
      return 'assets/icons/whatsapp.png';
    } else if (supportTypeId === 1) {
      return 'assets/icons/mail.png';
    } else {
      return 'assets/icons/user.png';
    }
  }

  getOnCallNextWeek() {
    this.onCallService.findOnChangeId(this.idAsked).subscribe(
      (data) => {
        this.onCallsWeek = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des on calls:', error);
      }
    );
  }
}

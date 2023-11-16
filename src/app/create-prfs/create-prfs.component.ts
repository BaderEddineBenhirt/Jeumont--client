import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InfosService } from '../services/infos.service';
import { TicketsService } from '../services/tickets.service';
import { SharedTitleService } from '../services/shared-title.service';
import { Router } from '@angular/router';
import { ConversationService } from '../services/conversation.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-prfs',
  templateUrl: './create-prfs.component.html',
  styleUrls: ['./create-prfs.component.scss']
})
export class CreatePrfsComponent implements OnInit {
  selectedFiles: File[] = [];
  form!: FormGroup; // Declare a FormGroup
  effectTypes: any[] = [];
  prfm: any[] = [];
  sides: any[] = [];
  skills: any[] = [];
  levels: any[] = [];
  statuses: any[] = [];
  ships: any[] = [];
  customers: any[] = [];
  fleets: any[] = [];
  effects: any[] = [];
  selectedCustomer: any | undefined;
  selectedFleet: any | undefined;
  attachments: Array<{ name: string, size: string }> = [];
  numberOfAttachments: number = 0;
  selectedOptionSupport: string = '';
  text:string = 'Your ticket has been successfully created.';
  isVisible = false;
  prfsCreated!: any;
  effectsAdded: any[] = [];
  loading: boolean = false;


      currentRoute!: string;
  curentRole? :boolean;
    curentAdmin? :boolean;
 


  constructor(
    private fb: FormBuilder,
    private conversationService: ConversationService,
    private cookieService: CookieService,
    private infosService: InfosService, 
    private ticketsService: TicketsService,
    private sharedTitleService: SharedTitleService,
    private messageService: MessageService,
    private router: Router,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    this.redirect() ;
    this.sharedTitleService.changeTitle('PRFS CREATION');
    this.form = this.fb.group({
      asked_description: [''],
      customer_uuid: [''],
      fleet_id: [''],
      ship_uuid: [''],
      prfs_resume: [''],
      prfs_analyse: [''],
      prfs_root_cause: [''],
      prfs_action_taken: [''],
      asked_prfm: null,
      effect_type_id: 0,
      effect_id: 0,
      side_id: 0,
      skill_id: 0,
      level_id: 0,
      user_uuid: this.cookieService.get('user_uuid')
    });
    this.fetchEffectTypes();
    this.fetchSides();
    this.fetchSkills();
    this.fetchLevels();
    this.fetchPRFM();
    this.fetchCustomers();
    this.fetchEffects();
  }

  private fetchEffectTypes(): void {
    this.infosService.getEffectTypes().subscribe(
      data => {
        this.effectTypes = data;
      },
      error => {
        console.error('Erreur lors de la récupération des types d\'effet:', error);
      }
    );
  }

  private fetchSides(): void {
    this.infosService.getSides().subscribe(
      data => {
        this.sides = data;
      },
      error => {
        console.error('Erreur lors de la récupération des côtés:', error);
      }
    );
  }

  private fetchSkills(): void {
    this.infosService.getSkills().subscribe(
      data => {
        this.skills = data;
      },
      error => {
        console.error('Erreur lors de la récupération des compétences:', error);
      }
    );
  }

  private fetchLevels(): void {
    this.infosService.getLevels().subscribe(
      data => {
        this.levels = data;
      },
      error => {
        console.error('Erreur lors de la récupération des niveaux:', error);
      }
    );
  }

  private fetchEffects(): void {
    this.infosService.getEffects().subscribe(
      data => {
        this.effects = data;
      },
      error => {
        console.error('Erreur lors de la récupération des niveaux:', error);
      }
    );
  }

  private fetchShipsByFleet(fleet_id: number): void {
    this.infosService.getShipsByFleet(fleet_id).subscribe(
      data => {
        this.ships = data;
      },
      error => {
        console.error('Erreur lors de la récupération des navires:', error);
      }
    );
  }

  uploadFile(askedUuid: string, userUuid: string) {
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }

      this.ticketsService.uploadFile(formData, askedUuid, userUuid).subscribe(
        (response) => {
          console.log('Files uploaded successfully', response);
        },
        (error) => {
          console.error('File upload failed', error);
        }
      );
    }
  }

  private fetchFleetsByCustomer(customer_uuid: string): void {
    this.infosService.getFleetsByCustomer(customer_uuid).subscribe(
      data => {
        this.fleets = data;
      },
      error => {
        console.error('Erreur lors de la récupération des navires:', error);
      }
    );
  }

  private fetchCustomers(): void {
    this.infosService.getCustomers().subscribe(
      data => {
        this.customers = data;
      },
      error => {
        console.error('Erreur lors de la récupération des clients:', error);
      }
    );
  }
  
  changeUser(): void {    
    const customerUuidControl = this.form.get('customer_uuid');
    const fleetIdControl = this.form.get('fleet_id');
    const ShipUuidControl = this.form.get('ship_uuid');
    
    if (customerUuidControl) {
      const customerUuidValue = customerUuidControl.value;
      this.fetchFleetsByCustomer(customerUuidValue);
    } else {
      console.log("Customer UUID Control is null");
    }

    if (fleetIdControl) {
      fleetIdControl.setValue('')
    }

    if (ShipUuidControl) {
      ShipUuidControl.setValue('')
    }
  }
  

  changeFleet(): void {
    const fleetIdControl = this.form.get('fleet_id');
    const ShipUuidControl = this.form.get('ship_uuid');
    
    if (fleetIdControl) {
      const fleetIdValue = fleetIdControl.value;
     
      this.fetchShipsByFleet(fleetIdValue);
    } else {
      console.log("Fleet ID Control is null");
    }

    if (ShipUuidControl) {
      ShipUuidControl.setValue('')
    }
  }

  private fetchPRFM(): void {
    this.ticketsService.getAskedPRFM().subscribe(
      data => {
        this.prfm = data;
      },
      error => {
        console.error('Erreur lors de la récupération des navires:', error);
      }
    );
  }

  getColorRGB(hexColor: string): string {
    const hex = hexColor.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return r + ',' + g + ',' + b;
  }

  submitForm() {
    this.loading = true;
    const formData = this.form.value;

    this.ticketsService.createAskedPRFS(formData).subscribe(
      response => {
        this.openPopup();
       
        const data = {
          convers_title: response.asked_ref, 
          asked_uuid: response.asked_uuid
        }  

        for (const item of this.effectsAdded) {
          const dataToEvent = {
            effect_id: Number(item.effect_id), 
            asked_uuid: response.asked_uuid
          }

          console.log(dataToEvent);

          this.addEventToAsked(dataToEvent);
        }

        const user_uuid = this.cookieService.get('user_uuid');

        const dataToAskedUser = {
          user_uuid,
          asked_uuid: response.asked_uuid
        }

        this.createAskedUser(dataToAskedUser);
        this.uploadFile(response.asked_uuid, user_uuid);
        this.createConversation(data);
        this.loading = false;
      },
      error => {
        console.error('Error creating PRFS:', error);
        this.loading = false;
      }
    );
  }

  createConversation(data:any) {
    this.conversationService.createConversation(data).subscribe(
      response => {
        console.log(response);
        setTimeout(() => {

          const user_uuid = this.cookieService.get('user_uuid');

          const messageWhats: any = {
            message_text: 'Mail send to support', 
            convers_uuid: response.convers_uuid, 
            support_type_id: 1, 
            user_uuid
          };

          const messageMail: any = {
            message_text: 'Message whatsapp send to support', 
            convers_uuid: response.convers_uuid, 
            support_type_id: 4, 
            user_uuid
          };
      
          this.messageService.createMessage(messageWhats).subscribe(
            response => {
            },
            error => {
              console.error(error);
            }
          );

          this.messageService.createMessage(messageMail).subscribe(
            response => {
            },
            error => {
              console.error(error);
            }
          );

          
           if(this.curentAdmin){
        
            this.router.navigate(['/technnav']);
         
          }
          if(this.curentRole){
        
            this.router.navigate(['/client']);
          }

        }, 4000); 
      },
      error => {
        console.error('Error creating Conversation:', error);
      }
    );
  }

  createAskedUser (data: any) {
    this.ticketsService.createAskedUser(data).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Error creating Conversation:', error);
      }
    );
  }

  cancel() {
    this.form = this.fb.group({
      asked_description: [''],
      customer_uuid: [''],
      fleet_id: [''],
      ship_uuid: [''],
      prfs_resume: [''],
      prfs_analyse: [''],
      prfs_root_cause: [''],
      prfs_action_taken: [''],
      asked_prfm: null,
      effect_type_id: 0,
      effect_id: 0,
      side_id: 0,
      skill_id: 0,
      level_id: 0
    });
 if(this.curentAdmin){
        
            this.router.navigate(['/technnav']);
         
          }
          if(this.curentRole){
        
            this.router.navigate(['/client']);
          }
  }

  onFileChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
    const files = event.target.files;
    this.handleFiles(files);
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.handleFiles(files);
  }

  handleFiles(files: File[]) {
    for (const file of files) {
      this.attachments.push({ name: file.name, size: this.formatFileSize(file.size) });
    }
    this.numberOfAttachments = this.attachments.length;
  }

  formatFileSize(size: number): string {
    const megabytes = size / (1024 * 1024); // Convert bytes to megabytes
    return megabytes.toFixed(2) + ' Mo';
  }

  openPopup() {
    this.isVisible = true;
  }

  addEffectToTable() {
    const effectId = this.form.get('effect_id');
    if (effectId && !this.effectsAdded.includes(effectId.value)) {
      this.infosService.getEffectById(effectId.value).subscribe(
        response => {
          this.effectsAdded.push(response);
        },
        error => {
          console.error('Error creating Conversation:', error);
        }
      );      

      this.form.get('effect_id')?.setValue(0);
    }
  }

  removeEffect(index: number) {
    this.effectsAdded.splice(index, 1);
  }

  addEventToAsked (data: any) {
    this.ticketsService.askedAddEvent(data).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Error creating Conversation:', error);
      }
    );    
  }
   redirect() {
    const userRole = this.authService.getUserRole();
  
    if (userRole === 1 || userRole === 2 || userRole === 3 || userRole === 4) {
      this.curentAdmin=true
    } else if (userRole === 10 || userRole === 11 || userRole === 12) {
      this.curentRole=true
    }
  }
}
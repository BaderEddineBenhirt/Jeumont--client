import { Component, OnInit, ElementRef, QueryList, ViewChildren, Renderer2, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from '../services/tickets.service';
import { SharedTitleService } from '../services/shared-title.service';
import { InfosService } from '../services/infos.service';
import { TagsService } from '../services/tags.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-update-prfs',
  templateUrl: './update-prfs.component.html',
  styleUrls: ['./update-prfs.component.scss'],
})
export class UpdatePrfsComponent implements OnInit {
  selectedFiles: File[] = [];
  text: string = 'Your ticket has been successfully modified.';
  askedUuid!: string | null;
  asked: any;
  askedToUpdate: any;
  logs: any[] = [];
  newMessage: string = '';
  updateDescription: boolean = false;
  updateAnalysis: boolean = false;
  updateActionTaken: boolean = false;
  updateRootCause: boolean = false;
  updateType: boolean = false;
  updateSide: boolean = false;
  updateStatus: boolean = false;
  updateTypeEffect: boolean = false;
  updateLevel: boolean = false;
  effectTypes: any[] = [];
  sides: any[] = [];
  skills: any[] = [];
  levels: any[] = [];
  effects: any[] = [];
  tags: any[] = [];
  allStatus: any[] = [];
  isVisible: boolean = false;
  conversation: any;
  effectsAsked: any[] = [];
  tagsAsked: any[] = [];
  attachements: any[] = [];
  effect_id: number = 0;
  tag_id: number = 0;
  analysis: any;
  files: any[] = [];
  maxFileCount: number = 10;

  @ViewChildren('messageDiv') messageDivs!: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private infosService: InfosService,
    private ticketsService: TicketsService,
    private tagsService: TagsService,
    private cookieService: CookieService,
    private sharedTitleService: SharedTitleService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.askedUuid = params.get('asked_uuid');
      if (this.askedUuid) {
        this.fetchLogsByAsked();
        this.fetchEffectsByAsked();
        this.fetchAskedTags();
        this.fetchAskedData();
        this.getAttachements();
        this.askedToUpdate = {
          asked_uuid: this.askedUuid,
          asked_description: this.asked.asked_description,
          ship_uuid: this.asked.Ship.ship_uuid,
          prfs_resume: this.asked.prfs_resume,
          prfs_analyse: this.asked.prfs_analyse,
          prfs_root_cause: this.asked.prfs_root_cause,
          prfs_action_taken: this.asked.prfs_action_taken,
          asked_prfm: this.asked.asked_prfm,
          effect_type_id: this.asked.EffectType.effect_type_id,
          side_id: this.asked.Side.side_id,
          skill_id: this.asked.Skill.skill_id,
          level_id: this.asked.Level.level_id,
        };
      }
    });
    this.fetchEffectTypes();
    this.fetchSides();
    this.fetchSkills();
    this.fetchLevels();
    this.fetchEffects();
    this.fetchTags();
    this.fetchStatus();
  }

  private fetchStatus(): void {
    this.infosService.getStatuses().subscribe(
      (data) => {
        this.allStatus = data;
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des types d'effet:",
          error
        );
      }
    );
  }

  private fetchEffectTypes(): void {
    this.infosService.getEffectTypes().subscribe(
      (data) => {
        this.effectTypes = data;
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des types d'effet:",
          error
        );
      }
    );
  }

  private fetchTags(): void {
    this.tagsService.getTags().subscribe(
      (data) => {
        this.tags = data;
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des types d'effet:",
          error
        );
      }
    );
  }

  private fetchAskedTags(): void {
    if (this.askedUuid !== null) {
      // Vérifiez que customerUuid n'est pas null
      this.infosService.getTagsByAsked(this.askedUuid).subscribe(
        (data) => {
          this.tagsAsked = data;
        },
        (error) => {
          console.error(
            "Erreur lors de la récupération des types d'effet:",
            error
          );
        }
      );
    }
  }

  private getAttachements() {
    if (this.askedUuid !== null) {
      // Vérifiez que customerUuid n'est pas null
      this.ticketsService.getAttachements(this.askedUuid).subscribe(
        (data) => {
          console.log(data);
          this.attachements = data;
        },
        (error) => {
          console.error(
            "Erreur lors de la récupération des types d'effet:",
            error
          );
        }
      );
    }
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

  private fetchEffects(): void {
    this.infosService.getEffects().subscribe(
      (data) => {
        this.effects = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des niveaux:', error);
      }
    );
  }

  private fetchSides(): void {
    this.infosService.getSides().subscribe(
      (data) => {
        this.sides = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des côtés:', error);
      }
    );
  }

  private fetchSkills(): void {
    this.infosService.getSkills().subscribe(
      (data) => {
        this.skills = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des compétences:', error);
      }
    );
  }

  private fetchLevels(): void {
    this.infosService.getLevels().subscribe(
      (data) => {
        this.levels = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des niveaux:', error);
      }
    );
  }

  fetchEffectsByAsked(): void {
    if (this.askedUuid !== null) {
      // Vérifiez que customerUuid n'est pas null
      this.infosService.getEffectsByAsked(this.askedUuid).subscribe(
        (data) => {
          this.effectsAsked = data;
        },
        (error) => {
          console.error('Error fetching asked details:', error);
        }
      );
    }
  }
  letsee(){
    console.log(this.askedToUpdate.asked_description);
    this.asked.asked_description = this.askedToUpdate.asked_description;
    this.asked.prfs_analyse = this.askedToUpdate.prfs_analyse;
     this.asked.prfs_root_cause = this.askedToUpdate.prfs_root_cause;
    this.asked.prfs_action_taken = this.askedToUpdate.prfs_action_taken;
   
     
  }

  fetchLogsByAsked(): void {
    if (this.askedUuid !== null) {
      // Vérifiez que customerUuid n'est pas null
      this.infosService.getLogsByAsked(this.askedUuid).subscribe(
        (data) => {
          console.log(data);
          this.logs = data;
        },
        (error) => {
          console.error('Error fetching asked details:', error);
        }
      );
    }
  }

  fetchAskedData(): void {
    if (this.askedUuid !== null) {
      // Vérifiez que customerUuid n'est pas null
      this.ticketsService.getOneAskedPRFSData(this.askedUuid).subscribe(
        (data) => {
          this.asked = data;
          this.askedToUpdate = {
            asked_description: data.asked_description,
            ship_uuid: data.Ship.ship_uuid,
            prfs_resume: data.prfs_resume,
            prfs_analyse: data.prfs_analyse,
            prfs_root_cause: data.prfs_root_cause,
            prfs_action_taken: data.prfs_action_taken,
            asked_prfm: data.asked_prfm,
            effect_type_id: data.EffectType.effect_type_id,
            side_id: data.Side.side_id,
            status_id: data.Status.status_id,
            skill_id: data.Skill.skill_id,
            level_id: data.Level.level_id,
          };

          this.sharedTitleService.changeTitle(data.asked_ref);
        },
        (error) => {
          console.error('Error fetching asked details:', error);
        }
      );
    }
  }

  submitForm() {
    this.ticketsService
      .updateAskedPRFS(this.askedToUpdate, this.asked.asked_uuid)
      .subscribe(
        (response) => {
          this.openPopup();
          if (this.askedUuid) {
            const user_uuid = this.cookieService.get('user_uuid');
            this.uploadFile(this.askedUuid, user_uuid);
          }
          setTimeout(() => {
            this.router.navigate(['/technnav']);
          }, 500);
        },
        (error) => {
          console.error('Error update PRFS:', error);
        }
      );
  }

  toggleUpdateDescription() {
    this.updateDescription = !this.updateDescription;
  }

  toggleStatus() {
    this.updateStatus = !this.updateStatus;
  }

  toggleUpdateAnalysis() {
    this.updateAnalysis = !this.updateAnalysis;
  }

  toggleUpdateRootCause() {
    this.updateRootCause = !this.updateRootCause;
  }

  toggleActionTaken() {
    this.updateActionTaken = !this.updateActionTaken;
  }

  toggleType() {
    this.updateType = !this.updateType;
  }

  toggleSide() {
    this.updateSide = !this.updateSide;
  }

  toggleTypeEffect() {
    this.updateTypeEffect = !this.updateTypeEffect;
  }

  toggleLevel() {
    this.updateLevel = !this.updateLevel;
  }

  isImage(fileName: string): boolean {
    const imageExtensions = [
      'jpeg',
      'jpg',
      'png',
      'gif',
      'bmp',
      'tiff',
      'tif',
      'svg',
      'webp',
      'raw',
      'ico',
      'heic',
      'heif',
      'psd',
      'ai',
    ];
    const fileExtension = fileName.split('.').pop()?.toLowerCase(); // Get the file extension in lowercase

    if (fileExtension !== undefined) {
      return imageExtensions.includes(fileExtension);
    }

    return false;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onFileChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
    const files = event.target.files;
    this.handleFiles(files);
  }

  handleFiles(files: File[]) {
    for (const file of files) {
      this.files.push({
        name: file.name,
        size: this.formatFileSize(file.size),
      });
    }
  }

  formatFileSize(size: number): string {
    const megabytes = size / (1024 * 1024); // Convert bytes to megabytes
    return megabytes.toFixed(2) + ' Mo';
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const droppedFiles = event.dataTransfer?.files;

    if (droppedFiles && droppedFiles.length > 0) {
      for (let i = 0; i < droppedFiles.length; i++) {
        if (this.files.length < this.maxFileCount) {
          const file = droppedFiles[i];

          // Utilisez l'URL.createObjectURL pour obtenir le chemin du fichier
          const filePath = URL.createObjectURL(file);

          this.files.push({
            name: file.name,
            path: filePath,
          });
        } else {
          alert('files has been truncated to 10 files.');
        }
      }
    }
  }

  getFileNameWithoutExtension(fileName: string): string {
    const lastIndex = fileName.lastIndexOf('.');
    if (lastIndex !== -1) {
      return fileName.slice(0, lastIndex);
    } else {
      return fileName;
    }
  }

  downloadFile(filename: string) {
    // Use the JavaScript String `split` method to split the path based on the '/' delimiter
    const pathSegments = filename.split('/');

    // Get the last element, which is the file name
    const fileName = pathSegments[pathSegments.length - 1];

    this.ticketsService.downloadAttachement(fileName).subscribe(
      (data) => {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des types d'effet:",
          error
        );
      }
    );
  }

  deleteFile(attachementId: string) {
    if (this.askedUuid) {
      this.ticketsService.removeAttachement(attachementId).subscribe(
        (data) => {
          this.getAttachements();
        },
        (error) => {
          console.error(
            "Erreur lors de la récupération des types d'effet:",
            error
          );
        }
      );
    } else {
      console.log('rrrr');
    }
  }

  openPopup() {
    this.isVisible = true;
  }

  addTagToAsked() {
    if (this.tag_id && this.askedUuid) {
      const data = {
        asked_uuid: this.askedUuid,
        tag_id: this.tag_id,
      };

      this.ticketsService.askedAddTag(data).subscribe(
        (response) => {
          console.log(response);
          this.fetchAskedTags();
          this.tag_id = 0;
        },
        (error) => {
          console.error('Error creating Conversation:', error);
        }
      );
    } else {
      console.log('rrrr');
    }
  }

  DeleteTagToAsked(tag_id: number) {
    if (tag_id && this.askedUuid) {
      this.ticketsService.askedDeleteTag(tag_id, this.askedUuid).subscribe(
        (response) => {
          this.fetchAskedTags();
        },
        (error) => {
          console.error('Error creating Conversation:', error);
        }
      );
    } else {
      console.log('rrrr');
    }
  }

  addEventToAsked() {
    if (this.effect_id && this.askedUuid) {
      const data = {
        asked_uuid: this.askedUuid,
        effect_id: this.effect_id,
      };

      this.ticketsService.askedAddEvent(data).subscribe(
        (response) => {
          console.log(response);
          this.fetchEffectsByAsked();
          this.effect_id = 0;
        },
        (error) => {
          console.error('Error creating Conversation:', error);
        }
      );
    } else {
      console.log('rrrr');
    }
  }

  DeleteEventToAsked(effect_id: number) {
    if (effect_id && this.askedUuid) {
      this.ticketsService.askedDeleteEvent(effect_id, this.askedUuid).subscribe(
        (response) => {
          this.fetchEffectsByAsked();
        },
        (error) => {
          console.error('Error creating Conversation:', error);
        }
      );
    } else {
      console.log('rrrr');
    }
  }

  cancel() {
    this.router.navigate(['/technnav']);
  }

  getColorRGB(hexColor: string): string {
    const hex = hexColor.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return r + ',' + g + ',' + b;
  }
}


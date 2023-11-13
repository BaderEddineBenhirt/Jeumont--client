import { Component, OnInit } from '@angular/core';
import { TagsService } from '../services/tags.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-config-categorie',
  templateUrl: './config-categorie.component.html',
  styleUrls: ['./config-categorie.component.scss']
})
export class ConfigCategorieComponent  implements OnInit {
  form!: FormGroup; // Declare a FormGroup
  tags: any[] = [];
  isCreateTagVisible: boolean = false;  
  selectedTag:number = 0 ;

  constructor(
    private fb: FormBuilder,
    private tagsService: TagsService, 
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tag_label: [''],
    });
    this.fetchTags();
  }

  private fetchTags(): void {
    this.tagsService.getTags().subscribe(
      data => {
        this.tags = data;
      },
      error => {
        console.error('Erreur lors de la récupération des côtés:', error);
      }
    );
  }

  toggleCreateTag () {
    this.isCreateTagVisible = !this.isCreateTagVisible;
    
  }

  createTag () { 
    const formData = this.form.value;
    this.tagsService.createTag(formData).subscribe(
      response => {
        console.log('Tag created successfully:', response);
        alert('Tag created successfully');
        this.form.reset();
        this.fetchTags();
        this.isCreateTagVisible = !this.isCreateTagVisible;
      },
      error => {
        console.error('Error creating user:', error);
      }
    );
  }

}

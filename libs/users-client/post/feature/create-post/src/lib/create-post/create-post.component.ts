import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CreatePostStepperComponent } from '@food-stories/users-client/post/ui/create-post-stepper';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { getImageUrlFromFile } from '@food-stories/users-client/shared/utils';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CreatePostService } from './create-post.service';
import { Store } from '@ngrx/store';
import { selectCurrentUserIdOrUsername } from '@food-stories/users-client/shared/app-init';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'fs-create-post',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    CreatePostStepperComponent,
    CdkStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostDialogComponent implements OnInit {
  @ViewChild(CreatePostStepperComponent) stepper!: CdkStepper;

  dialogRef = inject(MatDialogRef<CreatePostDialogComponent>)
  createPostService = inject(CreatePostService);
  store = inject(Store);
  storage = inject(Storage);
  auth = inject(Auth);
  mediaUrls: string[] = [];

  userId!: string;
  postId: string | undefined;

  ngOnInit(): void {
    this.store
      .select(selectCurrentUserIdOrUsername)
      .subscribe((userIdOrUsername) => (this.userId = userIdOrUsername.id));
  }

  files!: FileList;
  imageUrls: string[] = [];

  caption = new FormControl();

  async onFileAdd(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      this.files = files;
      for (let i = 0; i < files.length; i++) {
        this.imageUrls.push(await getImageUrlFromFile(files[i]));
      }
      this.stepper.next();
    }
  }

  trackByFn(index: number, item: string): string {
    return item;
  }

  sharePost() {

    const fileUploadPromises: Promise<string>[] = [];
    this.createPostService
      .createPost(this.caption.value, this.userId)
      .subscribe((res) => {
        console.log(res);
        this.postId = res.id;
        for (let i = 0; i < this.files.length; i++) {
          const refPath = ref(this.storage, 'posts/' + res.id);
          const uploadTask = uploadBytes(refPath, this.files[i]);
          uploadTask.then(() => fileUploadPromises.push(getDownloadURL(refPath)));
        }

        Promise.all(fileUploadPromises).then((res) => {
          res.forEach((url) => this.mediaUrls.push(url));
          if (this.postId) {
            this.createPostService.updatePostMediaUrls(this.postId, this.mediaUrls).subscribe(
             () => this.dialogRef.close()
            );
          }
        })
      });

  
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.files = files;
      console.log(this.files);
      this.stepper.next();
    }
  }
}
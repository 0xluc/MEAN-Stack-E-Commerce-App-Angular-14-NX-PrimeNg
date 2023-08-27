import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {
  selectedImage: string;
  @Input() images: string[] | undefined;
  constructor() { }
  ngOnInit(): void {
    if(this.images?.length){
      this.selectedImage = this.images[0];
    }
  }
  changeSelectedImage(imageUrl: string){
    this.selectedImage = imageUrl;
  }
  get hasImages(){
    if (this.images === undefined) {
      return false;
    }
    return this.images?.length > 0
  }

}

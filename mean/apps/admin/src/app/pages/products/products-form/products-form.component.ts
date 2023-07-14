import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mean-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit{

  editMode = false
  form: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
      this._initForm()
  }
  onSubmit(){}
  private _initForm(){
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      brand: ['',Validators.required],
      price: ['',Validators.required],
      category: ['',Validators.required],
      countInStock: ['',Validators.required],
      description: ['',Validators.required],
      rickDescription: ['',Validators.required],
      image: ['',Validators.required],
      isFeatured: ['',Validators.required],
    })
  }
  get productForm(){
    return this.form.controls
  }
}

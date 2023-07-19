import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@mean/products';

@Component({
  selector: 'mean-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit{

  editMode = false
  form: FormGroup
  categories: Category[] = []
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService
  ) { }
  ngOnInit(): void {
      this._initForm()
      this._getCategories()
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
  private _getCategories(){
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories
    })
  }
  get productForm(){
    return this.form.controls
  }

}

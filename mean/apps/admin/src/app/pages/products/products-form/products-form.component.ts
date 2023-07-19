import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService, Category, ProductsService } from '@mean/products';
import { MessageService } from 'primeng/api';

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
  imageDisplay: string | ArrayBuffer | null
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private router: Router
  ) { }
  ngOnInit(): void {
      this._initForm()
      this._getCategories()
  }
  onSubmit(){
    if(this.form.invalid)
    return;
    const productFormData = new FormData()
    productFormData.append('name', this.productForm['name'].value)
    productFormData.append('price', this.productForm['price'].value)
    productFormData.append('description', this.productForm['description'].value)
    productFormData.append('brand', this.productForm['brand'].value)
    productFormData.append('productCategory', this.productForm['category'].value)
    productFormData.append('countInStock', this.productForm['countInStock'].value)
    productFormData.append('richDescription', this.productForm['richDescription'].value)
    productFormData.append('isFeatured', this.productForm['isFeatured'].value)
    productFormData.append('image', this.productForm['image'].value)
    this._addProduct(productFormData)
  }
  private _initForm(){
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      brand: ['',Validators.required],
      price: ['',Validators.required],
      category: ['',Validators.required],
      countInStock: ['',Validators.required],
      description: ['',Validators.required],
      richDescription: ['',Validators.required],
      image: ['',Validators.required],
      isFeatured: [false,Validators.required],
    })
  }
  onImageUpload(event:any){
    const file = event.target.files[0]
    if(file) {
      this.form.patchValue({
        image: file
      })
      this.form.get('image')?.updateValueAndValidity()
      const fileReader = new FileReader()
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result
      }
      fileReader.readAsDataURL(file)
    }
  }
  private _addProduct(productFormData: FormData){
    this.productsService.createProduct(productFormData).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product added successfully'
      })
      this.router.navigate(['/products'])
    }, error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.error,
      })
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

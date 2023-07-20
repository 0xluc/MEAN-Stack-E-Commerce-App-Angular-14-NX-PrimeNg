import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  imageDisplay: string | ArrayBuffer | null | undefined
  currentProductId: string
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
      this._initForm()
      this._getCategories()
      this._checkEditMode()
  }
  onSubmit(){
    if(this.form.invalid) {
      return;
    }
    const productFormData = new FormData()
    productFormData.append('name', this.form.controls['name'].value)
    productFormData.append('price', this.form.controls['price'].value)
    productFormData.append('description', this.form.controls['description'].value)
    productFormData.append('brand', this.form.controls['brand'].value)
    productFormData.append('category', this.form.controls['category'].value)
    productFormData.append('countInStock', this.form.controls['countInStock'].value)
    productFormData.append('richDescription', this.form.controls['richDescription'].value)
    productFormData.append('isFeatured', this.form.controls['isFeatured'].value)
    productFormData.append('image', this.form.controls['image'].value)
    productFormData.forEach((value, key) => {
      console.log("key %s: value %s", key, value);
    })
    if(this.editMode) {
      this._updateProduct(productFormData)
    } else{
      this._addProduct(productFormData)
    }
  }
  private _updateProduct(productFormData: FormData){
    this.productsService.updateProduct(productFormData, this.currentProductId).subscribe(() => {
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
  private _initForm(){
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      brand: ['',Validators.required],
      price: ['',Validators.required],
      category: ['',Validators.required],
      countInStock: ['',Validators.required],
      description: ['',Validators.required],
      richDescription: ['',Validators.required],
      image: ['', Validators.required],
      isFeatured: [false],
    })
  }
  private _checkEditMode(){
    this.route.params.subscribe((params) => {
      if(params['id']){
        this.editMode = true
        this.currentProductId = params['id']
        this.productsService.getProduct(params['id']).subscribe(product => {
          console.log(product)
          this.form.controls['name'].setValue(product.name)
          this.form.controls['brand'].setValue(product.brand)
          this.form.controls['price'].setValue(product.price)
          this.form.controls['description'].setValue(product.description)
          this.form.controls['countInStock'].setValue(product.countInStock)
          this.form.controls['richDescription'].setValue(product.richDescription)
          this.form.controls['isFeatured'].setValue(product.isFeatured)
          this.form.controls['image'].setValue(product.image)
          this.form.controls['category'].setValue(product.productCategory?.id)
          this.imageDisplay = product.image
          this.form.controls.image.setValidators([])
          this.form.controls.image.updateValueAndValidity()
        })
      }
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

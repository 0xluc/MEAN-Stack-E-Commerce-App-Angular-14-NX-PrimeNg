import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder   } from '@angular/forms';
import { CategoriesService, Category } from '@mean/products';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mean-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit{
  form: FormGroup
  editMode = false
  currentCategoryId: number

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
     this.form = this.formBuilder.group({
       name: ['', Validators.required],
       icon: ['', Validators.required],
     }) 
     this._checkEditMode()
  }
  onSubmit(): void {
    if(this.form.valid){
      const category: Category = {
        name: this.categoryForm['name'].value,
        icon: this.categoryForm['icon'].value,
      }
      if(!this.editMode){
        this.addCategory(category)
      }
      else {
        category.id = this.currentCategoryId
        this.editCategory(category) 
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please review your form',
      })
    }
  }
  addCategory(category: Category){
    this.categoriesService.createCategory(category).subscribe(() => {
        this.form.reset()
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Category Created',
        })
        this.router.navigate(['/categories'])
      }, error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error,
          })
      })
  }
  editCategory(category: Category){
    this.categoriesService.updateCategory(category).subscribe(() => {
      this.form.reset()
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Category Updated',
      })
      this.router.navigate(['/categories'])
    }, error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.error,
      })
    })
  }
  public get categoryForm() : any {
    return this.form.controls
  }
  private _checkEditMode(){
    this.route.params.subscribe(params => {
      if(params['id']){
        this.editMode = true
        this.currentCategoryId = params['id']
        this.categoriesService.getCategory(params['id']).subscribe(category => {
          this.categoryForm['name'].setValue(category.name)
          this.categoryForm['icon'].setValue(category.icon)
        })
      }
    })
  }
}

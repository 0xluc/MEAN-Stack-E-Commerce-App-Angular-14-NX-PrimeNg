import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder   } from '@angular/forms';
import { CategoriesService, Category } from '@mean/products';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'mean-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit{
  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private router: Router
  ) { }
  ngOnInit(): void {
     this.form = this.formBuilder.group({
       name: ['', Validators.required],
       icon: ['', Validators.required],
     }) 
  }
  onSubmit(): void {
    if(this.form.valid){
      console.log(this.categoryForm['name'].value)
      console.log(this.categoryForm['icon'].value)
      const category: Category = {
        name: this.categoryForm['name'].value,
        icon: this.categoryForm['icon'].value,
      }
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
  }
  public get categoryForm() : any {
    return this.form.controls
  }
}

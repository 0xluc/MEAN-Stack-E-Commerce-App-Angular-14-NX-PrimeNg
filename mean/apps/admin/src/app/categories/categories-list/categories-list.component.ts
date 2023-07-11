import { CategoriesService, Category } from '@mean/products';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'mean-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit{

  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((categories) =>{
      this.categories = categories
    }
                                                    )
  }
  deleteCategory(id: string): Observable<Object>{
    this.categoriesService.deleteCategory(id).subscribe(() =>{
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Category Deleted',
        life: 3000
      })
    }, (error:any) =>{
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error,
        life: 3000
      })
    })

  }



import { CategoriesService, Category } from '@mean/products';
import { Component, OnInit } from '@angular/core';

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
  ) { }
  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((categories) =>{
      this.categories = categories
    } 
    )      
  }

}

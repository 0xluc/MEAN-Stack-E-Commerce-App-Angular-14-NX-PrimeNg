import { Router } from '@angular/router';
import { CategoriesService, Category } from '@mean/products';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'mean-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit, OnDestroy{

  categories: Category[] = [];
  endSub$ = new Subject<void>();
  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }
  ngOnInit(): void {
   this._getCategories() 
  }
  ngOnDestroy(): void {
   this.endSub$.next()
   this.endSub$.complete()
  }
  updateCategory(id: string){
    this.router.navigateByUrl('/categories/form/' + id)
  }
  deleteCategory(id: string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.categoriesService.deleteCategory(id).subscribe(() =>{
              this._getCategories()
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
      },
      reject: (type: ConfirmEventType) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                  break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                  break;
          }
      }
        });
  }
  private _getCategories(){
    this.categoriesService.getCategories().pipe(takeUntil(this.endSub$)).subscribe((categories) =>{
      this.categories = categories
    })
  }
}


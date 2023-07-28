import { Router } from '@angular/router';
import { UsersService } from '@mean/products';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'libs/products/src/lib/models/user';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'mean-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit, OnDestroy{

  users: User[] = []
  endSub$ = new Subject<void>();
  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getUsers()
  }
  ngOnDestroy(): void {
    this.endSub$.next()
    this.endSub$.complete()
  }  
  updateUser(id: string){
    this.router.navigateByUrl('/users/form/' + id)
  }
  deleteUser(id: string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.usersService.deleteUser(id).subscribe(() =>{
              this._getUsers()
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'User Deleted',
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
    })
  }
  private _getUsers(){
    this.usersService.getUsers().pipe(takeUntil(this.endSub$)).subscribe((users) =>{
      this.users = users
    })
  }

}

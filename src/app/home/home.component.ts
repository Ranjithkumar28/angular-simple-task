import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public appContainer = 10;
  public oraContainer = 10;
  public grapContainer = 10;
  public finalBasket: any[] = [];
  public permissionCheck: any;

  constructor(
    private readonly authService: AuthService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    this.permissionCheck = this.authService.getLoggedUser();
    if (!this.permissionCheck) {
      this.router.navigate(['/login']);
    }
  }

  /**
   * This method is used to add the fruit in basket
   * @param {string} container
   * @memberof HomeComponent
   */
  public incBasket(container: string) {
    if (this.permissionCheck.permission === "all") {
      container == 'Apple' ? this.appContainer = this.appContainer - 1 : (
        container == 'Orange' ? this.oraContainer = this.oraContainer - 1 : this.grapContainer = this.grapContainer - 1)
      this.finalBasket.unshift(container);
    } else {
      this.toastr.error("You don\'t have to admin rights");
    }
  }

  /**
   * This method is used to delete the fruit in basket
   * @param {string} container
   * @memberof HomeComponent
   */
  public decBasket(container: string) {
    if (this.permissionCheck.permission === "all") {
      if (this.finalBasket.length > 0 && this.finalBasket[0] === container) {
        container == 'Apple' ? this.appContainer = this.appContainer + 1 : (
          container == 'Orange' ? this.oraContainer = this.oraContainer + 1 : this.grapContainer = this.grapContainer + 1)
        this.finalBasket.shift();
      } else {
        this.toastr.error("Please select the appropriate basket to remove the fruit");
      }
    } else {
      this.toastr.error("You don\'t have to admin rights");
    }
  }
}

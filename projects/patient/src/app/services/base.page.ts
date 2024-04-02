import { Router } from "@angular/router";
import { CookieServiceService } from "./cookie-service.service";

export abstract class BasePage {

    constructor(public router: Router,
        public cookieService: CookieServiceService
      ) {}

    public routeUserNotLogged() {
        if(!this.cookieService.isLogged()) {
            this.router.navigate(['login']);
        }
    }
}

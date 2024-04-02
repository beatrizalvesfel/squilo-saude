import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { CookieServiceService } from "./cookie-service.service";
import { LoaderService } from "./loader.service";

@Injectable()
export class HttpServiceInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    public loaderService: LoaderService,
    private cookieService: CookieServiceService
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('token');
    this.loaderService.isLoading.next(true);

    if (token) {
      // If we have a token, we set it to the header
      request = request.clone({
        setHeaders: { 'Authorization': `Bearer  ${token}` }
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
        this.loaderService.isLoading.next(false);
        return throwError(err);
      }),
      finalize(
        () => {
          this.loaderService.isLoading.next(false);
        }
      )
    )
  }
}

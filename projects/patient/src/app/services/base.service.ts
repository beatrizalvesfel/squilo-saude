import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from '../../environments/environment'


export abstract class BaseService {
    getBaseUrl() {
        return environment.apiBaseUrl;
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Client side error
            errorMessage = error.error.message;
        } else {
            // Server side error
            errorMessage = `Error code: ${error.status}, ` + `message: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(error);
    };
}

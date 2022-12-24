import { Injectable } from '@angular/core';
import { AuthenticationService } from '../providers/Authentication/authentication';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService:AuthenticationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUserValue;
    if(currentUser != null){
      request = request.clone({
        setHeaders: {
          Authorization: `token ${currentUser?.jwToken}`
        }
      });
    }

    request = request.clone({
      setHeaders: {
        "Content-Type": "application/json"
      }
    });

    return next.handle(request);
  }
}
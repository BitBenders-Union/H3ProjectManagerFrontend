import { HttpErrorResponse, HttpHandlerFn, HttpHeaderResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { TokenService } from '../service/token.service';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';

//intercept api call make a clone, modity headers, send with modify headers

export const tokenInterceptor: HttpInterceptorFn = (req:HttpRequest<unknown>, next: HttpHandlerFn) => {
  const auth = inject(TokenService);
  const token = auth.getAccessToken();
  const modifyRequest = req.clone({
    setHeaders: {
      'Content-Type': 'Application/Json',
      Authorization: `Bearer ${token}`,
    }
  });
  return next(modifyRequest).pipe(
    catchError((err: any) => {
      //Look for http error response
      if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          auth.renewToken().subscribe(data =>
            {
              auth.storeAccessToken(data.accessToken);
              auth.storeRefreshToken(data.refreshToken);

              req = req.clone({
                setHeaders: {
                  'Content-Type': 'Application/Json',
                  Authorization: `Bearer ${data.accessToken}`,
                }
              })
            }
          );
          return next(req);
        }
      }
      return throwError(() => err);
    })
  );

};


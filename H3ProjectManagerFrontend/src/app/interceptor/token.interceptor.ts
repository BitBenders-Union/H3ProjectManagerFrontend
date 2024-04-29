import { HttpErrorResponse, HttpHandlerFn, HttpHeaderResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { TokenService } from '../service/token.service';
import { catchError } from 'rxjs';

//intercept api call make a clone, modity headers, send with modify headers
export const tokenInterceptor: HttpInterceptorFn = (req:HttpRequest<unknown>, next: HttpHandlerFn) => {
  const token = TokenService.getToken();
  const modifyRequest = req.clone({
    setHeaders: {
      'Content-Type': 'Application/Json',
      Authorization: `Bearer ${token}`,
    }
  });
  return next(modifyRequest).pipe(
    // HttpErrorResponse(
    // )
  );
};


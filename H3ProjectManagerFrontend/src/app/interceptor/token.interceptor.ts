import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req:HttpRequest<unknown>, next: HttpHandlerFn) => {
  const token = localStorage.getItem("AccessToken");
  const modifyRequest = req.clone({
    headers: req.headers.set("Authorization", `Bearer ${token}`)
  });
  return next(modifyRequest);
};

import { HttpEvent, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next): Observable<HttpEvent<any>> => {

  if (req.method === 'GET') {
    const APP_ID = environment.APP_ID

    const request = req.clone({
      params: req.params.append('APPID', APP_ID)
    })
    return next(request)
  }

  return next(req);
};

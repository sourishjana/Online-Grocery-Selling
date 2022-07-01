import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token=localStorage.getItem('token')
        if(token){
            // we make a clone of the req going to server and add the headers
            req=req.clone({
                setHeaders:{
                    Authorization:`Bearer ${token}`
                }
            })
        }
        return next.handle(req)
    }
}
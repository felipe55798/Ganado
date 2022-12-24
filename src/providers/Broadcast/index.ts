import { Observable, Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class BroadcastService{
    private _authSuccess: Subject<boolean> = new Subject();
    AuthSuccess$ = this._authSuccess.asObservable();

    private _showHeader: Subject<boolean> = new Subject();
    ShowHeader$ = this._showHeader.asObservable();

    private _showFooter: Subject<boolean> = new Subject();
    ShowFooter$ = this._showFooter.asObservable();

    private _showFullScreen: Subject<boolean> = new Subject();
    ShowFullScreen$ = this._showFullScreen.asObservable();

    private _showBackButton: Subject<boolean> = new Subject();
    ShowBackButton$ = this._showBackButton.asObservable();

    private _applyScrollStyle: Subject<string> = new Subject();
    ApplyScrollStyle$ = this._applyScrollStyle.asObservable();

    private _showSplashScreen: Subject<boolean> = new Subject();
    ShowSplashScreen$ = this._showSplashScreen.asObservable();
    /**
     *
     */
    constructor() {
    }

    Auth(result:boolean){
        this._authSuccess.next(result);
    }

    ShowHeader(show:boolean){
        this._showHeader.next(show);
    }

    ShowFooter(show:boolean){
        this._showFooter.next(show);
    }

    ShowFullScreen(show:boolean){
        this._showFullScreen.next(show);
    }

    ShowBackButton(show:boolean){
        this._showBackButton.next(show);
    }

    ApplyScrollStyle(element:string){
        this._applyScrollStyle.next(element);
    }

    ShowSplashScreen(show:boolean){
        this._showSplashScreen.next(show);
    }

}
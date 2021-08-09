import { Injectable, ElementRef, Renderer2, RendererFactory2 } from "@angular/core";
import { connect, ConnectOptions } from "twilio-video";
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TwilioService {

    constructor(
        private http: HttpClient,
    ) { }

    joinOrCreateRoom() {
        this.getAuthToken().subscribe(res => {
            console.log(res)
            connect(res.token, { name: 'DailyStandup' }).then(room => {
                console.log(`Successfully joined a Room: ${room}`);
                room.on('participantConnected', participant => {
                    console.log(`A remote Participant connected: ${participant}`);
                });
            }, error => {
                console.error(`Unable to connect to Room: ${error.message}`);
            });
        })

    }

    getAuthToken() {
        return this.http.get<any>('http://localhost:5001/unawa-1/us-central1/generateVideoToken');

    }
}
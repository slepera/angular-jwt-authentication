import { Injectable } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { AuthenticationService } from './_services/authentication.service';

@Injectable({
    providedIn: 'root'
})

export class WebSocketAPI {

    //webSocketEndPoint: string = 'http://localhost:8082/ws';
    webSocketEndPoint: string = '/ccs/api/customer/ws';

    stompClient: CompatClient;
    constructor(
        private authenticationService: AuthenticationService
    ) {
    }

    _connect() {
        var promise = new Promise<void>((resolve, reject) => {
            console.log("Initialize WebSocket Connection");
            let ws = new SockJS(this.webSocketEndPoint);
            this.stompClient = Stomp.over(ws);
            const _this = this;
            _this.stompClient.connect({ 'X-Authorization': 'Bearer ' + this.authenticationService.currentUserValue.token }, () => {
                console.log('We Are Connected!!!');
            });
            setTimeout(() => {
                console.log("Async Work Complete");
                resolve();
            }, 1000);
        });
        return promise;
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

    /**
     * Send message to sever via web socket
     * @param {*} message
     */
    _send(message) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/parameter", {}, JSON.stringify(message));
    }

    _subscribe(topic) {
        this.stompClient.subscribe(topic, (sdkEvent) => {
            this.onMessageReceived(sdkEvent);
        }, { 'X-Authorization': 'Bearer ' + this.authenticationService.currentUserValue.token });
    }

    _unsubscribe(topic) {
        this.stompClient.unsubscribe(topic);
    }

    onMessageReceived(message) {
        console.log("Message Recieved from Server :: " + message.body);
        if (message.headers.destination == '/topic/status') {
            console.log(message.body);
        }
        if (message.headers.destination == '/topic/parameter') {
            console.log(message.body);
        }

    }
}
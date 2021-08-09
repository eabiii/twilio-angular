import { Component, OnInit } from '@angular/core';
import { TwilioService } from 'src/app/shared/services/twilio.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'twilio-angular';

  constructor(
    private twilioService: TwilioService
  ) { }

  ngOnInit() {
    //this.twilioService.joinOrCreateRoom()
  }

}

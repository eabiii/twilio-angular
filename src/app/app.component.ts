import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { TwilioService } from 'src/app/shared/services/twilio.service'
import { createLocalVideoTrack, LocalVideoTrack } from 'twilio-video';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('preview', { static: true }) previewElement: ElementRef;

  title = 'twilio-angular';
  videoTrack: LocalVideoTrack = null;

  constructor(
    private twilioService: TwilioService,
    private readonly renderer: Renderer2
  ) { }

  ngOnInit() {
    //this.twilioService.joinOrCreateRoom()
  }

  async ngAfterViewInit() {
    if (this.previewElement && this.previewElement.nativeElement) {
      // const selectedVideoInput = this.storageService.get('videoInputId');
      await this.initializeDevice();
    }
  }

  private async initializeDevice(deviceId?: string) {
    try {


      this.videoTrack = deviceId
        ? await createLocalVideoTrack({ deviceId })
        : await createLocalVideoTrack();

      const videoElement = this.videoTrack.attach();
      this.renderer.setStyle(videoElement, 'height', '100%');
      this.renderer.setStyle(videoElement, 'width', '100%');
      this.renderer.appendChild(this.previewElement.nativeElement, videoElement);
    } finally {
    }
  }
}

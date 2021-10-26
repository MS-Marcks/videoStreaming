import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';
@Component({
  selector: 'app-vjs-live',
  templateUrl: './vjs-live.component.html',
  styleUrls: ['./vjs-live.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VjsLiveComponent implements OnInit {
  @ViewChild('target', { static: true }) target: ElementRef | any;
  @Input() src: string = "";
  @Input() preload: string = "";

  constructor() { }

  ngOnInit() { }
}

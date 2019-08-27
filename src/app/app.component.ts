import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { EventListener } from '@angular/core/src/debug/debug_node';
import { EventManager } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sampleApp';
  results: any;
  link: string;

  ngOnInit() {
    this.link = "http://localhost:49511/Tools/GCLinerTool?tab=Geometry";
    //this.link = "http://localhost:4200/assets/iframepage.html";
  }

  //Callback function to process data from window.
  recieveMessage = (event: MessageEvent) => {
    if (typeof event.data === "string") {
      this.results = event.data
    }
    else if (event.data.data == undefined) {
      this.results = undefined;
    }
  }

  constructor() {
    //Event Listener for postMessage() from iframe.
    if (window.addEventListener) {
      window.addEventListener("message", this.recieveMessage.bind(this), false)
    }
  }

  //Send postMessage() to iframe
  myFunction() {
    var message = Math.random()
    var iframe = document.getElementById("iframeComponent")
    var iWindow = (<HTMLIFrameElement>iframe).contentWindow;
    iWindow.postMessage(message, "*")
  }
}


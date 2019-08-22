import { Component } from '@angular/core';
import { EventListener } from '@angular/core/src/debug/debug_node';
import { EventManager } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sampleApp';
  results: any;

  //Callback function to process data from window.
  recieveMessage = (event: MessageEvent) => {
    if( typeof event.data === "number"){
      this.results = event.data
    }
    else if(event.data.data == undefined){
      this.results = undefined;
    }
  }

  constructor(){
    //Event Listener for postMessage() from iframe.
    if(window.addEventListener){
      window.addEventListener("message", this.recieveMessage.bind(this), false)
    }
  }

  //Send postMessage() to iframe
  myFunction(){
    var message = Math.random()
    var iframe = document.getElementById("iframeComponent")
    var iWindow = (<HTMLIFrameElement>iframe).contentWindow;
    iWindow.postMessage(message, "*")
  }
}


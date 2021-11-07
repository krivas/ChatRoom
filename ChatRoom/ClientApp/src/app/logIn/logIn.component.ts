import { Component } from '@angular/core';

@Component({
  selector: 'app-logIn-component',
  templateUrl: './logIn.component.html',
  styleUrls: ['./logIn.component.css']
})
export class LogInComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}

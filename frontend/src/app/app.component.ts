import { Component } from '@angular/core';
import {Job} from './jobs/jobs.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedJobs:Job[]=[];
  onJobAdded(job){
    this.storedJobs.push(job);
  }
  title = 'frontend';
}

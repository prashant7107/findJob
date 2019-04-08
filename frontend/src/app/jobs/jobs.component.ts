import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


import { Job } from './jobs.model';
import { JobsService } from './jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html'
})


export class JobsComponent implements OnInit, OnDestroy {

  jobs: Job[] = [];
  private jobsSub: Subscription;
  private param1: string;
  private industry: string;

  constructor(public jobsService: JobsService, private route: ActivatedRoute) {}

  ngOnInit() {
    console.log('here');
    this.route.paramMap.subscribe(
      params => {
        this.param1 = params.get('industry');
      }

    );
    console.log(this.param1);

    this.jobsService.getJobs();
    this.jobsSub = this.jobsService.getJobUpdateListener()
      .subscribe((jobs: Job[]) => {
        this.jobs = jobs;
      });
  }

  ngOnDestroy() {
    this.jobsSub.unsubscribe();
  }

}

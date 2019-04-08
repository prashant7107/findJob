import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Job } from './jobs.model';


@Injectable({ providedIn: 'root' })
export class JobsService  {
  private jobs: Job[] = [];
  private jobsUpdated = new Subject<Job[]>();


  constructor(private http: HttpClient ) {  }


  getJobs() {
    console.log('just random');

    this.http
      .get<{ jobs: Job[] }>(
        'http://localhost:3000/api/jobs/', {params: {industry: 'education', skills: 'sanima'}}
       )
      .subscribe(jobData => {
        this.jobs = jobData.jobs;
        this.jobsUpdated.next([...this.jobs]);
      });
  }

  getJobUpdateListener() {
    return this.jobsUpdated.asObservable();
  }

  // addJob(title: string, location: string, industry: string, salary: string, jobtype: string, valid: string, url:string) {
  //   const job: Job = {title: title, location: location,industry:industry,salary:salary,jobType:jobtype,Valid:valid,url:url };
  //   this.http
  //     .post<{ message: string }>("http://localhost:3000/api/posts", job)
  //     .subscribe(responseData => {
  //       console.log(responseData.message);
  //       this.jobs.push(job);
  //       this.jobsUpdated.next([...this.jobs]);
  //     });
  // }
}

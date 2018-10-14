import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResumeSwiperComponent } from './resume-swiper/resume-swiper.component';
import { RecruitingDetailsComponent } from './recruiting-details/recruiting-details.component';

const routes: Routes = [
	{ path: 'swiper', component: ResumeSwiperComponent },
	{ path: 'details/:job', component: RecruitingDetailsComponent},
	{path: '', redirectTo: '/swiper', pathMatch: 'full'}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)]
})
export class routingModule { }
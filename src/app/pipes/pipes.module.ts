import { NgModule } from '@angular/core';
import { ReplaceDashPipe } from './replace-dash.pipe';

@NgModule({
  declarations: [ReplaceDashPipe],
  exports: [ReplaceDashPipe],
})
export class PipesModule {}

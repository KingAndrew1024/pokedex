import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarComponent } from './avatar/avatar.component';
import { CardComponent } from './card/card.component';
import { ItemComponent } from './item/item.component';
import { ListComponent } from './list/list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [CommonModule, PipesModule],
  declarations: [
    AvatarComponent,
    CardComponent,
    ItemComponent,
    ListComponent,
    ItemDetailComponent,
  ],
  exports: [AvatarComponent, CardComponent, ItemComponent, ListComponent],
})
export class SharedComponentsModule {}

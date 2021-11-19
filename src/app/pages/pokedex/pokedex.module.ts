import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from 'src/app/components/components.module';
import { POKEDEX_SERVICE } from 'src/app/contracts/pokedex-service';
import { PokedexServiceMock } from 'src/app/mocks/pokedex-service.mock';
import { PokedexService } from 'src/app/services/pokedex.service';
import { PokedexDetailComponent } from './pokedex-detail/pokedex-detail.component';
import { PokedexRoutingModule } from './pokedex-routing.module';
import { PokedexListComponent } from './list/pokedex-list.component';
import { PokedexLayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    PokedexListComponent,
    PokedexDetailComponent,
    PokedexLayoutComponent,
  ],
  imports: [CommonModule, PokedexRoutingModule, SharedComponentsModule],
  exports: [],
  providers: [
    {
      provide: POKEDEX_SERVICE,
      useClass: true ? PokedexService : PokedexServiceMock,
    },
  ],
})
export class PokedexModule {}

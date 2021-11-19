import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexLayoutComponent } from './layout/layout.component';
import { PokedexListComponent } from './list/pokedex-list.component';
import { PokedexDetailComponent } from './pokedex-detail/pokedex-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PokedexLayoutComponent,
    children: [
      {
        path: 'pokedex',
        component: PokedexListComponent,
      },
      {
        path: 'pokedex/:id',
        component: PokedexDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokedexRoutingModule {}

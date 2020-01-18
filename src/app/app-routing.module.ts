import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsComponent } from '../app/cards/cards.component'

const routes: Routes = [
  { path: 'cards', component: CardsComponent },
  { path: '', redirectTo: 'cards', pathMatch: 'full' },
  { path: '**', redirectTo: 'cards', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

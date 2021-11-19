import { CommonModule, Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SharedComponentsModule } from 'src/app/components/components.module';
import { POKEDEX_SERVICE } from 'src/app/contracts/pokedex-service';
import {
  ApiResult,
  PokedexServiceMock,
} from 'src/app/mocks/pokedex-service.mock';
import { PokedexLayoutComponent } from '../layout/layout.component';
import { PokedexDetailComponent } from '../pokedex-detail/pokedex-detail.component';
import { PokedexRoutingModule } from '../pokedex-routing.module';
import { PokedexListComponent } from './pokedex-list.component';

describe('PokedexListComponent', () => {
  let component: PokedexListComponent;
  let fixture: ComponentFixture<PokedexListComponent>;

  let location: Location;

  beforeEach(async(() => {
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

    TestBed.configureTestingModule({
      declarations: [
        PokedexListComponent,
        PokedexDetailComponent,
        PokedexLayoutComponent,
      ],
      imports: [
        CommonModule,
        PokedexRoutingModule,
        SharedComponentsModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        { provide: POKEDEX_SERVICE, useClass: PokedexServiceMock },
        Location,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call pokedexService.getItems() in ngOnInit()', () => {
    const spy = spyOn(component.pokedexService, 'getItems').and.returnValue(
      of()
    );

    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call pokedexService.getItemByIdOrName()', () => {
    const spy = spyOn(
      component.pokedexService,
      'getItemByIdOrName'
    ).and.returnValue(of());

    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call destroyed$.next(), destroyed$.next() on ngOnDestroy()', () => {
    spyOn(component.destroyed$, 'next');
    spyOn(component.destroyed$, 'complete');

    component.ngOnDestroy();

    expect(component.destroyed$.next).toHaveBeenCalled();
    expect(component.destroyed$.complete).toHaveBeenCalled();
  });

  it(`should render ${ApiResult.results.length} app-item on list`, () => {
    spyOn(component.pokedexService, 'getItems').and.returnValue(of());

    component.ngOnInit();

    const compiled: HTMLElement = fixture.nativeElement;
    const list = compiled.querySelectorAll('app-item');

    expect(list.length).toEqual(ApiResult.results.length);
  });

  //Didn't work yet :(
  xit(`should navigate to detail view`, fakeAsync(() => {
    spyOn(component.pokedexService, 'getItems').and.returnValue(of());

    component.ngOnInit();

    const router = TestBed.inject(Router);

    fixture.ngZone.run(() => {
      router.initialNavigation();
      router.navigateByUrl('/pokedex');
    });
    tick();

    const compiled: DebugElement = fixture.debugElement;
    const firstItem = compiled.query(By.css('app-item')).nativeElement;

    firstItem.click();
    tick();

    expect(router.url).toBe(`/pokedex/bulbasaur`);
  }));
});

import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  RouterModule,
} from '@angular/router';
import { of } from 'rxjs';
import { POKEDEX_SERVICE } from 'src/app/contracts/pokedex-service';
import { PokedexServiceMock } from 'src/app/mocks/pokedex-service.mock';
import { PokedexDetailComponent } from './pokedex-detail.component';

describe('PokedexDetailComponent', () => {
  let component: PokedexDetailComponent;
  let fixture: ComponentFixture<PokedexDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PokedexDetailComponent],
      imports: [RouterModule.forRoot([])],
      providers: [
        { provide: POKEDEX_SERVICE, useClass: PokedexServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: 'bulbasaur',
              }),
            },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call pokedexService.getStoredItems() on ngAfterViewInit()', () => {
    const spy = spyOn(
      component.pokedexService,
      'getStoredItems'
    ).and.returnValue(of());

    component.ngAfterViewInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should set selectedPokemon on ngAfterViewInit()', () => {
    component.pokedexService.getItems();

    spyOn(component.pokedexService, 'getStoredItems').and.callFake(() => ({
      bulbasaur: {
        name: 'bulbasaur',
      },
    }));

    component.ngAfterViewInit();

    expect(component.selectedPokemon).toBeDefined();
  });

  it('should call pokemonDetailsView.clear() on ngAfterViewInit()', () => {
    spyOn(component.pokemonDetailsView, 'clear');
    component.ngAfterViewInit();

    expect(component.pokemonDetailsView.clear).toHaveBeenCalled();
  });

  it('should render ItemDetailComponent', fakeAsync(() => {
    const tagName = 'app-item-detail';

    const compiled: HTMLElement = fixture.nativeElement;

    component.ngAfterViewInit();

    expect(compiled.querySelector(tagName)).toEqual(null);

    tick();

    expect(compiled.querySelector(tagName)).not.toEqual(null);
  }));
});

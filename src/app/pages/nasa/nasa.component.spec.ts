import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import NasaComponent from './nasa.component';

describe('NasaComponent', () => {
  let component: NasaComponent;
  let fixture: ComponentFixture<NasaComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NasaComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NasaComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the title of the photo received from the API', () => {
    const request = httpMock.expectOne((req) => req.url.includes('/planetary/apod'));
    request.flush({
      date: '2026-09-15',
      title: 'A Daytime Eclipse: Moon Occults Venus',
      explanation: 'There was something behind the clouds.',
      media_type: 'image',
      url: 'https://apod.nasa.gov/image.jpg'
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('A Daytime Eclipse');
    expect(compiled.querySelector('img')?.getAttribute('src')).toBe('https://apod.nasa.gov/image.jpg');
  });
});

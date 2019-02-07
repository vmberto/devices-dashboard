import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEnvironmentsComponent } from './client-environments.component';

describe('ClientEnvironmentsComponent', () => {
  let component: ClientEnvironmentsComponent;
  let fixture: ComponentFixture<ClientEnvironmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientEnvironmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEnvironmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

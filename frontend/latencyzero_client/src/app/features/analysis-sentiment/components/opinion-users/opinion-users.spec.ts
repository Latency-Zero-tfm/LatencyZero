import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionUsers } from './opinion-users';

describe('OpinionUsers', () => {
  let component: OpinionUsers;
  let fixture: ComponentFixture<OpinionUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpinionUsers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpinionUsers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

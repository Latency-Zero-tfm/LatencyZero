import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMenu } from './profile-menu';

describe('ProfileMenu', () => {
  let component: ProfileMenu;
  let fixture: ComponentFixture<ProfileMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

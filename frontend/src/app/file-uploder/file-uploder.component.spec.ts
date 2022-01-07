import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploderComponent } from './file-uploder.component';

describe('FileUploderComponent', () => {
  let component: FileUploderComponent;
  let fixture: ComponentFixture<FileUploderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

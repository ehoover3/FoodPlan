import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoodInventoryComponent } from './inventory.component'; // Corrected import

describe('FoodInventoryComponent', () => {
  let component: FoodInventoryComponent;
  let fixture: ComponentFixture<FoodInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodInventoryComponent], // Corrected component import
    }).compileComponents();

    fixture = TestBed.createComponent(FoodInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an initial empty list of food items', () => {
    expect(component.foodItems.length).toBe(0);
  });

  it('should call listFoodItems when addFoodItem is called', () => {
    spyOn(component, 'listFoodItems');
    component.addFoodItem();
    expect(component.listFoodItems).toHaveBeenCalled();
  });
});

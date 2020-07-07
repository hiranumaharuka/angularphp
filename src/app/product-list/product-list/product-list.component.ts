import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Products } from 'src/app/interfaces/products';
import { Observable, Subscription } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  products$: Observable<Products[]> = this.crudService
    .getProducts()
    .pipe(map((data) => data.reverse()));
  products: Products[];
  dataSource = this.products$;
  sub = new Subscription();
  form = this.fb.group({
    p_id: ['', [Validators.required, Validators.maxLength(10)]],
    p_name: ['', [Validators.required, Validators.maxLength(40)]],
    p_description: ['', [Validators.required, Validators.maxLength(100)]],
    p_price: ['', [Validators.required, Validators.maxLength(40)]],
  });
  constructor(private crudService: CrudService, private fb: FormBuilder) {}

  ngOnInit() {
    this.sub = this.products$.subscribe((data) => (this.products = data));
  }

  get idControl() {
    return this.form.get('p_id') as FormControl;
  }
  get nameControl() {
    return this.form.get('p_name') as FormControl;
  }
  get descriptionControl() {
    return this.form.get('p_description') as FormControl;
  }
  get priceControl() {
    return this.form.get('p_price') as FormControl;
  }

  submit(): void {
    const formData = this.form.value;
    console.log(formData);
    this.crudService
      .createProduct(formData)
      .subscribe((data) => {
        console.log(data);
        // this.products.push(data);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

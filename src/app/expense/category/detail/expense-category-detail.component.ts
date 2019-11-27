import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExpenseCategory } from '../expense-category.model';
import { ExpenseCategoryService } from '../expense-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from 'src/app/translation.service';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expense-category-detail',
  templateUrl: './expense-category-detail.component.html',
  styleUrls: ['./expense-category-detail.component.scss']
})
export class ExpenseCategoryDetailComponent implements OnInit, OnDestroy {

  public category: ExpenseCategory;

  private sub: Subscription;

  constructor(
    private service: ExpenseCategoryService,
    private route: ActivatedRoute,
    public t: TranslationService,
    private flash: FlashService,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params["id"];

    this.sub = this.service.find(id).subscribe(
      el => {
        this.category = el;
      },
      err => {
        this.flash.error(this.t.t("expense.category.flash.not_found"));
        this.router.navigate(["/expense/category"]);
      })

    /*this.service.list.pipe(
      filter(li)
    ).subscribe(list => {
      if (!list) return;

      const id = this.route.snapshot.params["id"];
      this.category = list[id];
    });*/
  }

  public onDelete(e: Event) {
    e.preventDefault();

    if (confirm(this.t.t("expense.category.confirm.delete"))) {
      this.service.delete(this.category).subscribe(res => {
        this.flash.success(this.t.t("expense.category.flash.deleted"));
      });
    }
  }

  public onRecover() {
    this.service.recover(this.category).subscribe(res => {
      this.flash.success(this.t.t("expense.category.flash.recovered"));
    });
  }

  public onRemove() {
    if (confirm(this.t.t("expense.category.confirm.remove"))) {
      this.service.remove(this.category).subscribe(res => {
        this.flash.success(this.t.t("expense.category.flash.removed"));
        this.router.navigate(["/expense/category"]);
      });
    }
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

}

import { BackdropService } from './../../services/backdrop.service';
import { Category } from './../../shared/interfaces/category.interface';
import { SubCategory } from 'src/app/shared/interfaces/sub-category.interface';
import { Component, Input, OnInit } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-catalog-popup',
  templateUrl: './catalog-popup.component.html',
  styleUrls: ['./catalog-popup.component.scss']
})
export class CatalogPopupComponent implements OnInit {
  @Input() categories: Category[] = [];
  activeCategory!: Category;
  activeSubCategory!: SubCategory;
  faChevronRight = faChevronRight;

  constructor(private backdropServ: BackdropService) { }

  ngOnInit(): void {
  }

  setActiveCategory(category: Category): void {
    this.activeCategory = category;
  }

  setActiveSubCategory(subCategory: SubCategory): void {
    this.activeSubCategory = subCategory;
  }

  hideBackdrop(): void {
    this.backdropServ.hideBackdrop();
  }
}

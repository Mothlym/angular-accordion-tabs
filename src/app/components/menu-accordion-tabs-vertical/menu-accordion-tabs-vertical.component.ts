import { TabData } from './../../model/tab-data';
import { Component, OnInit, Input, OnChanges, SimpleChanges, TemplateRef, Output, EventEmitter, ContentChild } from '@angular/core';

@Component({
  selector: 'app-menu-accordion-tabs-vertical',
  templateUrl: './menu-accordion-tabs-vertical.component.html',
  styleUrls: ['./menu-accordion-tabs-vertical.component.scss']
})
export class MenuAccordionTabsVerticalComponent implements OnInit, OnChanges {

  @Input() tabs: TabData[];
  @Output() selected = new EventEmitter<TabData>();
  @ContentChild(TemplateRef, {static: false}) templateRef: TemplateRef<any>;

  public selectedTab: TabData;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tabs && changes.tabs.currentValue) {
      this.tabs = changes.tabs.currentValue;
    }
  }

  ngOnInit(): void {
    this.setActiveInit();
  }

  public enable(tab: TabData): void {
    this.disableTabs();
    tab.active = true;
    this.selectedTab = tab;
    this.selected.emit(tab);
  }

  private disableTabs(): void {
    for (const tab of this.tabs) {
      tab.active = false;
    }
  }
  private setActiveInit(): void {
    if (this.tabs && this.tabs.length > 0) {
      this.tabs[0].active = true;
      this.selected.emit(this.tabs[0]);
      this.selectedTab = this.tabs[0];
    }
  }

}

import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {LayoutStore} from '../layout.store';

import {HeaderService} from './header.service';

import {removeListeners, removeSubscriptions} from '../../helpers';

/**
 * Header Logo
 */
@Component({
  selector: 'mk-layout-header-logo',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>'
})
export class HeaderLogoComponent {
  @ViewChild('templateRef', { static: true }) public templateRef: TemplateRef<any>;
}

/**
 * Header Logo Mini
 */
@Component({
  selector: 'mk-layout-header-logo-mini',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>'
})
export class HeaderLogoMiniComponent {
  @ViewChild('templateRef', { static: true }) public templateRef: TemplateRef<any>;
}

/**
 * Header
 */
@Component({
  selector: 'mk-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private isSidebarLeftCollapsed: boolean;
  private isSidebarRightCollapsed: boolean;
  private listeners = [];
  private subscriptions = [];

  @Input() isSidebarLeftToggle = true;
  @Input() isSidebarRightToggle = true;
  @Input() logoLink: string | any[] = '/';

  @ContentChild(HeaderLogoComponent, /* TODO: add static flag */ {static: true }) public headerLogoComponent: HeaderLogoComponent;
  @ContentChild(HeaderLogoMiniComponent, /* TODO: add static flag */ {static: true }) public headerLogoMiniComponent: HeaderLogoMiniComponent;

  @ViewChild('headerElement', { static: true }) private headerElement: ElementRef;
  @ViewChild('sidebarLeftToggleElement', { static: false }) private sidebarLeftToggleElement: ElementRef;
  @ViewChild('sidebarRightToggleElement', { static: false }) private sidebarRightToggleElement: ElementRef;

  /**
   * @method constructor
   * @param layoutStore [description]
   * @param ngZone      [description]
   * @param renderer2   [description]
   * @param elementRef   [description]
   * @param headerService   [description]
   */
  constructor(
    private layoutStore: LayoutStore,
    private ngZone: NgZone,
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private headerService: HeaderService
  ) {}

  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    this.headerService.elementRef = this.headerElement;

    if (this.sidebarLeftToggleElement) {
      this.subscriptions.push(this.layoutStore.isSidebarLeftCollapsed.subscribe((value: boolean) => {
        this.isSidebarLeftCollapsed = value;
      }));
      this.ngZone.runOutsideAngular(() => {
        this.listeners.push(this.renderer2.listen(this.sidebarLeftToggleElement.nativeElement, 'click', (event: Event) => {
          event.preventDefault();
          this.layoutStore.sidebarLeftCollapsed(!this.isSidebarLeftCollapsed);
        }));
      });
    }
    if (this.sidebarRightToggleElement) {
      this.subscriptions.push(this.layoutStore.isSidebarRightCollapsed.subscribe((value: boolean) => {
        this.isSidebarRightCollapsed = value;
      }));
      this.ngZone.runOutsideAngular(() => {
        this.listeners.push(this.renderer2.listen(this.sidebarRightToggleElement.nativeElement, 'click', (event: Event) => {
          event.preventDefault();
          this.layoutStore.sidebarRightCollapsed(!this.isSidebarRightCollapsed);
        }));
      });
    }
  }

  /**
   * @method ngOnDestroy
   */
  ngOnDestroy() {
    this.listeners = removeListeners(this.listeners);
    this.subscriptions = removeSubscriptions(this.subscriptions);
  }
}

import { afterNextRender, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from '@angular/common';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, NgbModule, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  providers: [LayoutService],
})
export class LayoutComponent {
  public dark: boolean =
    this.layout.config.settings.layout_version == "dark-only" ? true : false;
  menus = [
    {
      name: "Plays",
      routeUrl: "/plays",
      src: "../../../../assets/images/strategy.png",
      isActive: false,
    },
  ];
  menuTogggle: boolean = false;
  constructor(private router: Router, public layout: LayoutService,
    private modalService: NgbModal) {

    afterNextRender(() => {
      let themeColor = localStorage.getItem("__APP-THEME__");
      if (themeColor) {
        setTimeout(() => {
          this.layout.config.settings.layout_version = themeColor ?? "light";

          if (this.layout.config.settings.layout_version == "dark-only") {
            this.dark = true;
          }
        }, 0);
      }
    });
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
  }

  searchToggle() {
    this.router.navigate(["/offense-public/search"]);
  }

  layoutToggle() {
    // localStorage.removeItem("__APP-THEME__");
    // this.dark = !this.dark;
    // this.layout.config.settings.layout_version = this.dark
    //   ? "dark-only"
    //   : "light";
    // localStorage.setItem("__APP-THEME__", this.dark ? "dark-only" : "light");
  };

  click_menu(menu: any) {
    this.menus.forEach((element) => {
      element.isActive = false;
    });
    menu.isActive = true;
  };

  sidebarToggle() {
    this.menuTogggle = !this.menuTogggle;
  };

  goToFacebook() {
    afterNextRender(() => {
      window.open('https://www.facebook.com/StrongsideApp', "_blank");
    });
  };

  // goToReportingIssue() {
  //   this.modalService.open(ReportingIssueComponent, { centered: true });
  //   this.searchFocusService.setModalOpen(true);
  // };
}

import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OnInit, Renderer2, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  public title: string = "Piers' Application";
  lastUpdateDate: string;

  constructor(
    private titleService: Title,
    private renderer: Renderer2,
    private router: Router,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.router.navigate(['shows']);

    // const parallaxSections =
    //   this.el.nativeElement.querySelectorAll('.parallax-section');
    // const lastSection = parallaxSections[parallaxSections.length - 1];

    // this.renderer.listen('window', 'scroll', () => {
    //   const scrollPosition = window.scrollY;
    //   const lastSectionBottom =
    //     lastSection.offsetTop + lastSection.offsetHeight;

    //   // If trying to scroll past the last section, set scroll position to the maximum allowed
    //   if (scrollPosition > lastSectionBottom - window.innerHeight) {
    //     window.scrollTo(0, lastSectionBottom - window.innerHeight);
    //   }
    // });

    // // Format the date with date-fns-tz
    // this.updateLastUpdateDate();
  }

  updateLastUpdateDate() {
    const currentDate = new Date();
    this.lastUpdateDate = currentDate.toDateString();
  }

  selectedButtonId = 'home';

  navigateToHome() {
    this.selectedButtonId = 'home';
    // Add logic to navigate to the 'Home' page if needed
  }

  navigateToAbout() {
    this.selectedButtonId = 'about';
    // Add logic to navigate to the 'About' page if needed
  }

  navigateToPortfolio() {
    this.selectedButtonId = 'portfolio';
    // Add logic to navigate to the 'Portfolio' page if needed
  }

  navigateToContact() {
    this.selectedButtonId = 'contact';
    // Add logic to navigate to the 'Contact' page if needed
  }
}

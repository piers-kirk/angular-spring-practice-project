import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  public title: string = "Piers' Application";
  public pageTitle: string = 'Welcome!';

  tvShowForm = this.formBuilder.group({
    tvShow: '',
    streamingPlatform: '',
    genre: '',
  });

  constructor(private titleService: Title, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

  onSubmit(tableId: string): void {
    let tBody = document.querySelector('tbody');
    const tr = document.querySelectorAll('tr');
    if (
      tBody != null &&
      tr != null &&
      this.tvShowForm.value.tvShow != null &&
      this.tvShowForm.value.streamingPlatform != null &&
      this.tvShowForm.value.genre != null
    ) {
      let newRow = tBody.appendChild(tr[1].cloneNode(true));

      for (
        let i = 0;
        i < newRow.childNodes.length && newRow.childNodes[i] != null;
        i++
      ) {
        switch (i) {
          case 0:
            newRow.childNodes[i].textContent = this.tvShowForm.value.tvShow;
            break;
          case 1:
            newRow.childNodes[i].textContent =
              this.tvShowForm.value.streamingPlatform;
            break;
          default:
            newRow.childNodes[i].textContent = this.tvShowForm.value.genre;
        }
      }
    }
    this.tvShowForm.reset();
  }

  public deleteShow(tableId: string) {
    let tableRef = <HTMLTableElement>document.getElementById(tableId);
    if (tableRef !== null && tableRef.childNodes.length != 1) {
      tableRef.deleteRow(-1);
    }
  }
}

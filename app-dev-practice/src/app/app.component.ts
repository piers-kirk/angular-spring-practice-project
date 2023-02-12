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
    let tableRef = <HTMLTableElement>document.getElementById(tableId);
    if (
      tableRef !== null &&
      this.tvShowForm.value.tvShow != null &&
      this.tvShowForm.value.streamingPlatform != null &&
      this.tvShowForm.value.genre != null
    ) {
      const newRow = tableRef.insertRow(-1);

      let showNameCell = newRow.insertCell(0);
      const showName = document.createTextNode(this.tvShowForm.value.tvShow);
      showNameCell.appendChild(showName);

      let streamingPlatformCell = newRow.insertCell(1);
      const streamingPlatform = document.createTextNode(
        this.tvShowForm.value.streamingPlatform
      );
      streamingPlatformCell.appendChild(streamingPlatform);

      let genreCell = newRow.insertCell(2);
      const genre = document.createTextNode(this.tvShowForm.value.genre);
      genreCell.appendChild(genre);
    }
  }

  public deleteShow(tableId: string) {
    let tableRef = <HTMLTableElement>document.getElementById(tableId);
    if (tableRef !== null && tableRef.childNodes.length != 1) {
      tableRef.deleteRow(-1);
    }
  }
}

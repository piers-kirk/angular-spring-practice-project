import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  public title: string = "Piers' Application";
  public pageTitle: string = 'TV Shows';

  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

  public addShow(tableId: string) {
    let tableRef = <HTMLTableElement>document.getElementById(tableId);
    if (tableRef !== null) {
      const newRow = tableRef.insertRow(-1);

      let showNameCell = newRow.insertCell(0);
      const showName = document.createTextNode('The Last of Us');
      showNameCell.appendChild(showName);

      let streamingPlatformCell = newRow.insertCell(1);
      const streamingPlatform = document.createTextNode('HBO');
      streamingPlatformCell.appendChild(streamingPlatform);

      let genreCell = newRow.insertCell(2);
      const genre = document.createTextNode('Drama');
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

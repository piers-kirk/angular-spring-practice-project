import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'TV Shows';

  public addShow(tableId: string) {
    let tableRef = (<HTMLTableElement >document.getElementById(tableId));
    if (tableRef !== null) {
      let newRow = tableRef.insertRow(-1);
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
    let tableRef = (<HTMLTableElement >document.getElementById(tableId));
    if (tableRef !== null) {
      tableRef.deleteRow(-1);
    }
  }

}

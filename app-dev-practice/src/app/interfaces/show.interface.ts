export interface Show {
  showId: number;
  showName: string;
  episodesWatched: number;
  dateLastWatched: Date;
  thoughts: string;
  userRating: number;
}

export interface ExistingShowsObject {
  existingShows: Show[];
}

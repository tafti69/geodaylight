import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './messages.model';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(private http: HttpClient) {}

  getNoteById(id: number): Observable<Note[]> {
    return this.http.get<Note[]>(`https://webapi.geodaylight.site/notes/${id}`);
  }

  createNote(note: Note): Observable<Note[]> {
    return this.http.post<Note[]>(
      'https://webapi.geodaylight.site/notes/',
      note
    );
  }
}

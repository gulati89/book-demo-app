import { Component } from '@angular/core';
import { BookListComponent } from './components/book-list/book-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BookListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})  
export class App {
  title = 'books-app';
}
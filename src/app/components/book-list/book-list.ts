// src/app/components/books/books.component.ts
import { Component, inject } from '@angular/core';
import { BooksStore } from '../../store/books.store';
import { Book } from '../../models/book.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-list.html',
})
export class BookListComponent {
  store = inject(BooksStore);
  fb = inject(FormBuilder);

  // Reactive form
  bookForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    year: [new Date().getFullYear(), [Validators.required, Validators.min(0)]],
  });

  ngOnInit() {
    this.store.loadDummyBooks(); // preload dummy books
  }

  addBookFromForm() {
    if (this.bookForm.invalid) return;

    const formValue = this.bookForm.value;
    const newBook: Book = {
      id: Date.now(),
      title: formValue.title ?? '',
      author: formValue.author ?? '',
      year: Number(formValue.year),
    };

    this.store.addBook(newBook);
    this.bookForm.reset({ year: new Date().getFullYear() }); // reset form
  }

  removeBook(id: number) {
    this.store.removeBook(id);
  }
}

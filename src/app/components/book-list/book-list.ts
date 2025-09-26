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
  editing = false; // flag for edit mode


  // Reactive form
  bookForm = this.fb.group({
    id: [''], 
    title: ['', Validators.required],
    author: ['', Validators.required],
    year: [new Date().getFullYear(), [Validators.required, Validators.min(0)]],
  });

  ngOnInit() {
    this.store.loadDummyBooks(); // preload dummy books
  }

  submitForm() {
    if (this.bookForm.invalid) return;
    const value = this.bookForm.value as Book;

    if (this.editing) {
      this.store.updateBook(value);
      this.editing = false;
    } else {
      this.store.addBook({ ...value, id: crypto.randomUUID() });
    }
    this.bookForm.reset({ year: new Date().getFullYear() }); // reset form
  }

  editBook(book: Book) {
    this.editing = true;
    this.bookForm.patchValue(book);
  }

  removeBook(id: string) {
    this.store.removeBook(id);
    if (this.editing && this.bookForm.value.id === id) {
      this.editing = false;
      this.bookForm.reset({ year: new Date().getFullYear() });
    }
  }

  cancelEdit() {
    this.editing = false;
    this.bookForm.reset({ year: new Date().getFullYear() });
  }
}

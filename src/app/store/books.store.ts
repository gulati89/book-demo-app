import { signalStore, withState, withMethods, withComputed } from '@ngrx/signals';
import { computed } from '@angular/core';
import { Book } from '../models/book.model';

export const BooksStore = signalStore(
  { providedIn: 'root' }, // makes the store injectable

  // --- STATE ---
  withState({
    books: [] as Book[],
    isLoading: false,
    error: null as string | null,
  }),

  // --- METHODS ---
  withMethods((store: any) => ({
    addBook(book: Book) {
      const current = store.books();          // read
      store.books.set([...current, book]);    // write
    },
    removeBook(id: string) {
      const current = store.books();
      store.books.set(current.filter((b:any) => b.id !== id));
    },
    loadDummyBooks() {
      const dummy: Book[] = [
        { id: "1", title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', year: 1954 },
        { id: "2", title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813 },
      ];
      store.books.set(dummy);
    },
    updateBook(updated: Book) {
      store.books.set(
        store.books().map((b:any) => b.id === updated.id ? { ...b, ...updated } : b)
      );
    },
  })),

  // --- COMPUTED ---
  withComputed((store) => ({
    totalBooks: computed(() => store.books().length),
    recentBooks: computed(() => store.books().filter(b => b.year > 2000)),
  }))
);

import React from "react";

import './BookOfTheWeek.css';
import { BookInformation } from "../../../book";

export const BookOfTheWeek:React.FC = () => {
  return(
    <div className="book-of-the-week">
      <h1>Book of the Week:</h1>
      <BookInformation 
        book={
          {
            _id: "1234",
            barcode: "0062315005",
            cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg",
            title: "The Alchemist",
            authors: ["Paulo Coelho"],
            description: "Combining magic, mysticism, wisdom, and wonder into an inspiring tale of self-discovery, The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations.Paulo Coelho's masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different—and far more satisfying—than he ever imagined. Santiago's journey teaches us about the essential wisdom of listening to our hearts, recognizing opportunity and learning to read the omens strewn along life's path, and, most importantly, following our dreams.",
            subjects: [
              "Translations into Indonesian",
              "Voyages and travels",
              "Fiction",
              "Portuguese Fiction",
              "Self-realization",
              "Alchemists",
              "Young men",
              "Shepherds",
              "New York Times bestseller",
              "nyt:trade_fiction_paperback=2008-01-05",
              "nyt:trade_fiction_paperback=2007-12-02",
              "Fiction, visionary & metaphysical",
              "Spain, fiction",
              "FICTION / Literary",
              "BODY, MIND & SPIRIT / Spirituality / General",
              "BODY, MIND & SPIRIT / Inspiration & Personal Growth",
              "Fables",
              "Translations from English",
              "Thai fiction",
              "French language",
              "Reading materials",
              "Russian language edition",
              "Powieść brazylijska",
              "Tłumaczenia polskie",
              "Comics & graphic novels, general",
              "Mexican literature",
              "Alquimia",
              "Novela",
              "Pastores",
              "Andalucía (España)",
              "Alquimistas",
              "Large type books",
              "Fiction, fantasy, general",
              "Alchemy",
              "Quests (Expeditions)",
              "Literary",
              "BODY, MIND & SPIRIT",
              "Spirituality",
              "General",
              "Inspiration & Personal Growth",
              "Expeditions",
              "Parodies, imitations",
              "Comic books, strips",
              "Graphic novels"
            ],
            publicationDate: new Date("1988-01-01"),
            publisher: "HarperPerennial",
            pages: 182,
            genre: "Fiction",
            records: []
          }
        } />
    </div>
  )
}
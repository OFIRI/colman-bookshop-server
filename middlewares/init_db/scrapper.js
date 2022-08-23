import { load } from "cheerio";
import { default as axios } from 'axios';
import { Book } from "../../models/book.js";

const url = "https://www.modernlibrary.com/top-100/100-best-novels/";
const books = [];

export default () => {
  axios(url).then((response) => {
    const html = response.data;
    const $ = load(html);
    $(".row", html).each(function () {
      const title = $(this).find("strong").first().text();
      const author = $(this).find("li").text().split("by")[1].trim();
      const description = $(this)
        .find(".wrapper")
        .text()
        .split("Click here to read more about")[0]
        .trim();

      const price = Math.floor(Math.random() * (100 - 10) ) + 10;
      const inventory = Math.floor(Math.random() * (10 - 1) ) + 1;
      const book = { title, author, description, price: price, inventory: inventory};
      books.push(book);
    });

    Book.insertMany(books, (err, docs) => {
      if (err) return console.error(err);
      console.log("Books from scrapper were saved");
    });
  });
};

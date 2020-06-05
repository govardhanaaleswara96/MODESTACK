import { Component, OnInit } from '@angular/core';
import { ModeStackService } from '../mode-stack.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
  articles;
  constructor(private modeService: ModeStackService) {
    this.modeService
      .getArticles()
      .then((result) => {
        this.articles = result;
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnInit(): void {}
}

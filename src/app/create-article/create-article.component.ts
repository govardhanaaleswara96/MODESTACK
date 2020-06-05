import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModeStackService } from '../mode-stack.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
})
export class CreateArticleComponent implements OnInit {
  articleForm = this.fb.group({
    username: [this.modeService.getUserName()],
    title: ['', Validators.required],
    body: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private modeService: ModeStackService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  createArticle() {
    // console.log(this.articleForm.value);
    this.modeService
      .createArticle(this.articleForm.value)
      .then((result) => {
        //console.log(result);
        this.toastr.success(`${result['body'].message}`);
        this.router.navigate(['/article-list']);
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error(`Article Creation Failed`);
      });
    this.articleForm.reset();
  }
}

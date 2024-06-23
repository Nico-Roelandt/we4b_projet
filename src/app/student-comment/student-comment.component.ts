import { Component, OnInit } from '@angular/core';

interface Comment {
  author: string;
  content: string;
}

@Component({
  selector: 'app-student-comment',
  templateUrl: './student-comment.component.html',
  styleUrls: ['./student-comment.component.css']
})
export class StudentCommentComponent implements OnInit {
  comments: Comment[] = [];
  newComment: Comment = { author: '', content: '' };

  constructor() { }

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    this.comments = [
      { author: 'Student1', content: 'Great course!' },
      { author: 'Student2', content: 'Very informative.' }
    ];
  }

  addComment(): void {
    if (this.newComment.author && this.newComment.content) {
      this.comments.push({ ...this.newComment });
      this.newComment = { author: '', content: '' };
    }
  }
}

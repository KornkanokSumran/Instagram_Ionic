import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concat } from  'rxjs';
import { UploadingService } from  '../uploading.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  get_comment:string='';
  heart:string;
  responses:string;
  like:string;
  comments:string;
  constructor(private http: HttpClient, private uploadingService: UploadingService) { }
  ngOnInit() {
    this.http.get('http://127.0.0.1:8000/upload/file/',{responseType: 'text'})
    .subscribe((response) => {console.log(response);
    this.responses = JSON.parse(response).File.reverse()
    });
    this.http.get('http://127.0.0.1:8000/upload/like/',{responseType: 'text'})
    .subscribe((like) => {console.log(like);
    this.like = JSON.parse(like).File.reverse()
    });
    this.http.get('http://127.0.0.1:8000/upload/commentview/',{responseType: 'text'})
    .subscribe((comments) => {console.log(comments);
    this.comments = JSON.parse(comments).File
    });
    console.log(this.responses);
    // for(var i = 0; i < this.responses.length; i++){
    //   console.log(this.responses[i])
    // }
  }
  
  vote(id){
    let requests = [];

    let formData = new FormData();
    formData.append('name_id' , id);
    requests.push(this.uploadingService.count_like(formData));
    concat(...requests).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    );
  }

  comment(id){
    console.log(this.get_comment)
    let requests = [];

    let formData = new FormData();
    formData.append('name_id' , id);
    formData.append('comment', this.get_comment)
    requests.push(this.uploadingService.post_comment(formData));
    concat(...requests).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    );
  }

  // likeview(){
  //   this.http.get('http://127.0.0.1:8000/upload/like/',{responseType: 'text'})
  //   .subscribe((like) => {console.log(like);
  //   this.like = JSON.parse(like).File.reverse()
  //   });
  //   console.log(this.like);
  // }
}


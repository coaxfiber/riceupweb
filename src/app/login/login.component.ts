import { Component, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import { GlobalvarsService } from './../globalvars.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;data:any = {};
  constructor(private route: ActivatedRoute, private router: Router,
  	private http: Http,
  	public GlobalvarsProvider:GlobalvarsService,
  	fb: FormBuilder) {
  	this.form = fb.group({
        name: fb.group({
          uname: '',
          pw: '',
        }),
      });
  }
calltologin()
      {
         if (this.form.value.name.uname!=''&&this.form.value.name.pw!='') {
             this.GlobalvarsProvider.username=this.form.value.name.uname;
             this.GlobalvarsProvider.password=this.form.value.name.pw;
              
              let urlSearchParams = new URLSearchParams();
                urlSearchParams.append("grant_type",this.GlobalvarsProvider.grant_type);
                urlSearchParams.append("client_id",this.GlobalvarsProvider.client_id);
                urlSearchParams.append("client_secret",this.GlobalvarsProvider.client_secret);
                urlSearchParams.append("username",this.GlobalvarsProvider.username);
                urlSearchParams.append("password",this.GlobalvarsProvider.password);
                urlSearchParams.append("scope",this.GlobalvarsProvider.scope);
              let body = urlSearchParams.toString()

              var header = new Headers();
              header.append("Content-Type", "application/x-www-form-urlencoded");
              let option = new RequestOptions({ headers: header });
              this.http.post('http://api.riceupfarmers.org/oauth/token', body, option)
               .map(response => response.json())
                  .subscribe(data => {
                    if (data.token_type!=undefined) {
                      this.GlobalvarsProvider.settoken(data.token_type+" "+data.access_token);
                      //wwew start
                       var header = new Headers();
                        header.append("Accept", "application/json");
                        header.append("Content-Type", "application/x-www-form-urlencoded");
                        header.append("Authorization",this.GlobalvarsProvider.gettoken());
                              
                      let option = new RequestOptions({ headers: header });
                                    
                           this.http.get('http://api.riceupfarmers.org/api/user', option)
                           .map(response => response.json())
                          .subscribe(data => {
                            this.GlobalvarsProvider.setloggeduser(data);
  				                  this.router.navigate(['main']);
                         }, error => {
                         alert("Slow internet Connection!");
                             });
                            //wew end
                    }
                    else
                    alert("Invalid Username or password");
                    
               }
               , error => {
               console.log(error);
               alert("Failed to login. Make sure you have valid user credentials or you are connected to the internet.");
               
               });
              }
              else{
                alert("Input username or password!");
              }
            }
  ngOnInit() {

  }

}

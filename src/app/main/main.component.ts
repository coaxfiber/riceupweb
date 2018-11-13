import { Component, OnInit } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpModule } from '@angular/http';
import { GlobalvarsService } from './../globalvars.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ActivatedRoute } from '@angular/router'; 
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import {FileUploadModule} from 'primeng/primeng';
import { UpdateComponent } from './../update/update.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
public files: any[];
 timee:any;
 products:any;

 form: FormGroup;
  map2;
  long:string = '';
  lat:string = '';
  username:string = '';
  buttonDisabled = true;
  userData: any;
  datenow = Date.now();
  load = "no";
  constructor(private route: ActivatedRoute, private router: Router,
  	private http: Http,public dialog: MatDialog,
  	public GlobalvarsProvider:GlobalvarsService,
  	fb: FormBuilder) {

  	this.files = [];

  this.form = fb.group({
      name: fb.group({
        pname: '',
        desc: '',
        unit: '',
        price: '',
         stocks: '',
         harvest_date: '',
      }),
    });

     this.timee = Date.now();
     this.loadfunc();
  	    
  }
  loadfunc(){

  this.load = "yes";
    this.GlobalvarsProvider.setcredentials();
             var header = new Headers();
                header.append("Accept", "application/json");
                header.append("Authorization",this.GlobalvarsProvider.gettoken());

        let option = new RequestOptions({ headers: header });
        this.http.get('http://api.riceupfarmers.org/api/products/'+this.GlobalvarsProvider.loggeduser.id,option)
          .map(response => response.json())
          .subscribe(res => {
             if (res.message==undefined) {
               this.products = res;
                this.load = "no";
                console.log(res);
            }else
            {
              alert(res.message);
                          this.load = "no";
            }
             //wwww;
          }, error => {
                          this.load = "no";
                             });
  }
onFileChanged(event: any) {
  this.files = event.target.files;
}
onUpload() {
  if (this.files[0]==undefined) {
    alert("picture is required!");

  }else{
    if (this.form.value.name.pname!=""&&this.form.value.name.desc!=""&&this.form.value.name.unit!=""&&this.form.value.name.price!=""&&this.form.value.name.stocks!=""&&this.form.value.name.harvest_date!="") {
     const formData = new FormData();
                this.load = "yes";
    for (const file of this.files) {
        formData.append("file", file, file.name);
    }
    var timeInMs = Date.now();
       var url = 'http://riceupfarmers.org/wp-content/system/apiup.php?get='+this.form.value.name.pname+timeInMs
      this.http.post(url, formData).subscribe(x => console.log("success"));
      let urlSearchParams = new URLSearchParams();
                      urlSearchParams.append("grant_type",this.GlobalvarsProvider.grant_type);
                    let body = urlSearchParams.toString()
                     var header = new Headers();
                        header.append("Accept", "application/json");
                        header.append("Content-Type", "application/x-www-form-urlencoded");
                        header.append("Authorization",this.GlobalvarsProvider.gettoken());
                              
                        let option = new RequestOptions({ headers: header });
                                    
                           this.http.post('http://api.riceupfarmers.org/api/product/add?photo_url='+this.form.value.name.pname+timeInMs+'&name='+this.form.value.name.pname+'&desc='+this.form.value.name.desc+'&unit='+this.form.value.name.unit+'&price='+this.form.value.name.price+'&stocks='+this.form.value.name.stocks+'&harvest_date='+this.form.value.name.harvest_date, body,option)
                           .map(response => response.json())
                          .subscribe(data => {
                            if (data.message==undefined) {
                              alert(data);
                             this.loadfunc();
                              this.load = "no";
                            }else
                            alert(data.message);
                            this.loadfunc();
                            this.load = "no";
                            this.form.reset(); 
                         }, err => {
                            alert('Error while uploading file.');
                            this.load = "no";
                          });
           //end
        }else{
            alert("all the fields are required!");
                this.load = "no";
          }
      }
}
  ngOnInit() {
  }
 refresh(): void {
    this.loadfunc();
  }
 openDialog(property): void {
   this.GlobalvarsProvider.prodid=property;
    let dialogRef = this.dialog.open(UpdateComponent, {
      width: '600px',
      height: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
     this.loadfunc();
    });
  }
}

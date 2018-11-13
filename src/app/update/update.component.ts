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

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
load = "no";
public files: any[];
 timee:any;
 property:any;
 form: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router,
  	private http: Http,public dialog: MatDialog,
  	public GlobalvarsProvider:GlobalvarsService,
  	fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateComponent>) { 
  	this.files = [];

     this.timee = Date.now();
this.property = this.GlobalvarsProvider.prodid;
  this.form = fb.group({
      name: fb.group({
        pname: this.property.product_name,
        desc: this.property.product_desc,
        unit: this.property.unit_type,
        price: this.property.price_per_unit,
         stocks: this.property.stocks_available,
         harvest_date: this.property.date_of_harvest,
      }),
    });}
  onFileChanged(event: any) {
  this.files = event.target.files;
}
  update()
  {
     if (this.form.value.name.pname!=""&&this.form.value.name.desc!=""&&this.form.value.name.unit!=""&&this.form.value.name.price!=""&&this.form.value.name.stocks!=""&&this.form.value.name.harvest_date!="") {
              
            this.load = "yes";
              let urlSearchParams = new URLSearchParams();
                urlSearchParams.append("grant_type",this.GlobalvarsProvider.grant_type);
              let body = urlSearchParams.toString()
               var header = new Headers();
                  header.append("Accept", "application/json");
                  header.append("Content-Type", "application/x-www-form-urlencoded");
                  header.append("Authorization",this.GlobalvarsProvider.gettoken()); 
                  let option = new RequestOptions({ headers: header });
        
                this.http.patch('http://api.riceupfarmers.org/api/product/update/'+this.property.id+'?name='+this.form.value.name.pname+'&desc='+this.form.value.name.desc+'&photo_url='+this.property.photo_url+'&unit='+this.form.value.name.unit+'&price='+this.form.value.name.price+'&stocks='+this.form.value.name.stocks+'&harvest_date='+this.form.value.name.harvest_date,body,option)
                     .map(response => response.json())
                    .subscribe(data => {
                      this.load = "no";
                     alert("Product Updated!!");
                   });
            if (this.files[0]!=undefined) {
              const formData = new FormData();
                this.load = "yes";
              for (const file of this.files) {
                  formData.append("file", file, file.name);
              }
             var url = 'http://api.riceupfarmers.org/wp-content/system/uploadpro.php?get='+this.property.photo_url;
             this.http.post(url, formData).subscribe(x => 
                this.load = "no");this.onNoClick();
              }
        }else
        {
            alert("All Fields are required!");
        }

  }
  ngOnInit() {
  }
   onNoClick(): void {
    this.dialogRef.close();
  }

  delprod(ids: any){
    ids=this.GlobalvarsProvider.prodid.id;
    var txt;
    var r = confirm("Are you sure you want to remove the your Product?");
    if (r == true) {
              this.load = "yes";
               var header = new Headers();
                  header.append("Accept", "application/json");
                  header.append("Authorization",this.GlobalvarsProvider.gettoken());
                    
              let option = new RequestOptions({ headers: header });
              this.http.delete('http://api.riceupfarmers.org/api/product/remove/'+ids,option)
                .map(response => response.json())
                .subscribe(res => {
                  this.load = "no";this.onNoClick();
                  alert('Product Deleted!');
                });
    } else {
        txt = "Cancel";
    }

    
  }

}

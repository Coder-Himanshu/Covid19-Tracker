import { Component, OnInit, enableProdMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MessageService} from 'primeng/api';
import { Chart, ChartModule } from 'angular-highcharts';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HighchartsChartComponent } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { mapChart } from 'highcharts';
import * as $ from 'jquery';
import { News } from '../app/news';
import {DialogModule} from 'primeng/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit{
  title = 'Corona Live Tracker';
  searchText;
  xyz:any;
  totalrecovered:any;
  totalactive:any;
  totaldeaths:any;
  time:any;
  PerMillionPop:any;
  Totalcritical:any;
  affectedcountries:any;
  RealTime:any;
  Tabledata: any;
  TodayCases: any;
  newdeaths: any;
  DeathPerMillionPop: any;
chart:any;
  chartdata = [];
  chartt: Chart;
  chartttt: Chart;
  charttt: Chart;
  tempVar = [];
  Allcountry: any;
  ch_a=[];
  real: any;
  ch_b=[];
  h: any;
  sortValue: any[];
  arr: any[];

  ch_d=[];
  ch_c=[];
  arrr: any[];

  arrrr: any[];
  ch_f = [];
  ch_e = [];

  ch_g = [];
  ch_h = [];
  ar: any[];

  sortV: any[];
  sortVa: any[];
  sortVal: any[];
  cc: any;
  flagg: any;


  stateName:any
  statePositive:any;
  stateCured:any;
  stateDeath:any
  stateData:any
  stateSerialNumber:any
  value: any;

  sum:any = 0;
  newss:any;
  articleTitle = [];
  content = [];
  author = [];
  url = [];
  covidcenter:any;
  display: boolean = false;

  constructor(private http: HttpClient,private messageService: MessageService,private ngxLoader: NgxUiLoaderService) {

   }


  ngOnInit() {
  
    this.ngxLoader.start();
    //this.testingcenter();
     this.http.get<any>("https://newsapi.org/v2/everything?q=corona&rom=2020-04-16&latest&apiKey=2ac47b2f3f2a4fe0a059f631e2912078").subscribe(data => {
      this.newss = data;
     })

     this.http.get<any>("https://www.mohfw.gov.in/data/datanew.json").subscribe(data => {
      this.stateData = data;
    })

    // Simple GET request with response type <any>
    this.http.get<any>('https://corona.lmao.ninja/v2/all').subscribe(data => {
        this.xyz = data.cases;
        this.Totalcritical = data.critical;
        this.newdeaths = data.todayDeaths;
        this.totaldeaths = data.deaths;
        this.TodayCases = data.todayCases;
        this.totalrecovered = data.recovered;
        this.totalactive = data.active;
        this.time = new Date().toLocaleString(this.time);
        this.PerMillionPop = data.casesPerOneMillion;
        this.DeathPerMillionPop = data.deathsPerOneMillion;
        this.affectedcountries = data.affectedCountries;
    })

    this.http.get<any>('https://corona.lmao.ninja/v2/countries').subscribe(data => {
      data.country;
      this.Tabledata = data;
      data.countryInfo;
    })

    //table service data started

     this.http.get<any>('https://corona.lmao.ninja/v2/countries').subscribe(data => {
     data.forEach(element => {
      // console.log(`${element.country} ${element.todayCases}`);
       this.ch_a.push(element.country);
       this.ch_b.push(element.cases);
      });

      this.sortValue = this.ch_b.sort((a, b)=> (5));
      this.arr = [];
      for(let i=0;i<this.ch_a.length;i++)
      {
        this.arr[i]=new Array(2);
      }


      for(let i=0;i<this.ch_b.length;i++)
      {
        this.arr[i][0]=this.ch_a[i];
        this.arr[i][1]=this.ch_b[i];
        //this.arr.push(blankValue)

      }
      this.arr.sort(function(a, b) {
        return b[1] - a[1];
      });

      var obj = {};
      this.arr.forEach(element => {
        obj[element[0]] = element[1]
      });

      this.ch_a = []
      for(let i=0;i<10;i++)
      {
        this.ch_a[i] = this.arr[i][0]
      }

      //console.log("test  :", this.arr);
         this.chart = new Chart({
        chart: {
          type: 'column'
        },
        title: {
          text: 'Top 5 countries where total cases are high'
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: this.ch_a,
          //crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Total Cases Rate'
          }
      },
        series: [{
          name: 'Total Cases',
          color: "#f54287",
         // enableMouseTracking: false,
          type: undefined,
          data: this.arr.slice(0,5)
        }]

      });
      setTimeout(() => {
        this.messageService.add({sticky: true, severity:'info', summary:'Welcome Message', detail:'COVID-19 real time data visulization web app - Application is under development , please click cross button to close the message'});
      });
      this.ngxLoader.stop(); //hide loader animation
    })


    //below is pie chart

    this.http.get<any>('https://corona.lmao.ninja/v2/countries').subscribe(data => {
     data.forEach(element => {
      // console.log(`${element.country} ${element.todayCases}`);
       this.ch_c.push(element.country);
       this.ch_d.push(element.deaths);
      });

      this.sortV= this.ch_d.sort((a, b)=> (5));
      this.arrr = [];
      for(let i=0;i<this.ch_c.length;i++)
      {
        this.arrr[i]=new Array(2);
      }

      for(let i=0;i<this.ch_d.length;i++)
      {
        this.arrr[i][0]=this.ch_c[i];
        this.arrr[i][1]=this.ch_d[i];
      }

      this.arrr.sort(function(a, b) {
        return b[1] - a[1];
      });

      var obj = {};
      this.arrr.forEach(element => {
        obj[element[0]] = element[1]
      });

         this.chartt = new Chart({
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Top 5 countries where total death rate is high'
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: this.arrr,
         // crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Deaths Rate'
          }
      },
        series: [{
          name: 'Total Deaths',
          // color: "#E0E0E0",
         // enableMouseTracking: false,
          type: undefined,
          data: this.arrr.slice(0,5)
        }]
      });
     })


     //below is the line chart

     this.http.get<any>('https://corona.lmao.ninja/v2/countries').subscribe(data => {
      data.forEach(element => {
       // console.log(`${element.country} ${element.todayCases}`);
        this.ch_e.push(element.country);
        this.ch_f.push(element.recovered);
       });

       this.sortVa = this.ch_f.sort((a, b)=> (5));
       this.arrrr = [];
       for(let i=0;i<this.ch_e.length;i++)
       {
         this.arrrr[i]=new Array(2);
       }

       for(let i=0;i<this.ch_f.length;i++)
       {
         this.arrrr[i][0]=this.ch_e[i];
         this.arrrr[i][1]=this.ch_f[i];
       }

       this.arrrr.sort(function(a, b) {
         return b[1] - a[1];
       });

       var obj = {};
       this.arrrr.forEach(element => {
         obj[element[0]] = element[1]
       });

       this.ch_e = []
       for(let i=0;i<10;i++)
       {
         this.ch_e[i] = this.arrrr[i][0]
       }

          this.chartttt= new Chart({
         chart: {
           type: 'line'
         },
         title: {
           text: 'Top 5 countries where total recovered cases are high'
         },
         credits: {
           enabled: false
         },
         xAxis: {
           categories: this.ch_e,
           //crosshair: true
       },
       yAxis: {
           min: 0,
           title: {
               text: 'Recovered Cases Rate'
           }
       },
         series: [{
           name: 'Total Recovered Cases',
           color: "#77cf40",
          //enableMouseTracking: false,
           type: undefined,
           data: this.arrrr.slice(0,5)
         }]
       });
      })


      //area chart

      this.http.get<any>('https://corona.lmao.ninja/v2/countries').subscribe(data => {
        data.forEach(element => {
         // console.log(`${element.country} ${element.todayCases}`);
          this.ch_g.push(element.country);
          this.ch_h.push(element.active);
         });

         this.sortVal = this.ch_h.sort((a, b)=> (5));
         this.ar = [];
         for(let i=0;i<this.ch_g.length;i++)
         {
           this.ar[i]=new Array(2);
         }

         for(let i=0;i<this.ch_h.length;i++)
         {
           this.ar[i][0]=this.ch_g[i];
           this.ar[i][1]=this.ch_h[i];
         }

         this.ar.sort(function(a, b) {
           return b[1] - a[1];
         });

         var obj = {};
         this.ar.forEach(element => {
           obj[element[0]] = element[1]
         });

         this.ch_g = []
         for(let i=0;i<10;i++)
         {
           this.ch_g[i] = this.ar[i][0]
         }


            this.charttt= new Chart({
           chart: {
             type: 'area'
           },
           title: {
             text: 'Top 5 countries where total active cases are high'
           },
           credits: {
             enabled: false
           },
           xAxis: {
             categories: this.ch_g,
             //crosshair: true
         },
         yAxis: {
             min: 0,
             title: {
                 text: 'Active Cases Rate'
             }
         },
           series: [{
             name: 'Total Active Cases',
             color: "#42f2f5",
            // enableMouseTracking: false,
             type: undefined,
             data: this.ar.slice(0,5)
           }]

         });

        })

    setInterval(function() {
      location.reload();
    }, 180000);

  }

  testingcenter(){
    this.http.get<any>('../assets/testcenterDataINDIA.json').subscribe(data => {
      this.covidcenter = data;
    })
    this.display = true;
    }

  contact(){
  //this.messageService.add({sticky: true, severity:'success', summary:'Contact Me', detail:'This Website is developed by Himanshu Sharma, if you have any issue. please get in touch with me Linkedin - https://www.linkedin.com/in/creativehimanshu00/ '});
  window.open("https://www.linkedin.com/in/creativehimanshu00/");
}

resouce(){
  this.messageService.add({sticky: true, severity:'warn', summary:'Resource Links', detail:'https://www.mohfw.gov.in/#site-advisories  https://www.worldometers.info/coronavirus/  https://coronavirus.jhu.edu/map.html'});
}


}

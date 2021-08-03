import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Prism from 'prismjs';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { JoineeService } from '../services/joinee.services';
var menu = [];

menu = [
  {label: 'Dashboard123', route: 'dashboard', iconClasses: 'fa fa-dashboard'},
  {label: 'Pre On Boarding', route: 'pre-on-boarding', iconClasses: 'fa fa-handshake-o'},
  {label: 'Up-Comming Joinees', route: 'upcomming-joinee', iconClasses: 'fa fa-users'},
]

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, AfterViewInit {
  chartOptions : {}; 
  Highcharts = Highcharts;
  monthCount: any;
  candidatesCount: any;
  public permission = JSON.parse(localStorage.getItem('permissions'));
  public loginData = JSON.parse  (localStorage.getItem('login'));
  token = this.loginData['token'];
  
  constructor(
    private service: JoineeService
    ) { }

  ngOnInit() { 

    this.chartOptions = {
      chart: {
        backgroundColor: '#A68D79',
          type: 'line', 
          borderRadius: 10,
          borderWidth: 2,
          borderColor: '#A68D79',
      },
      title: {
          text: 'Joinee Survey', 
          style: {
            color: '#FFF',
            fontWeight: 'bold'
        }
      },
      subtitle: {
          text: 'Source: CGVAk', 
          style: {
            color: '#FFF'
        }
      },
      xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
          labels: {
            style: {
                color: 'black'
            }
        }
      },
      yAxis: {
          title: {
              text: 'Numbers', 
              style: {
                color: '#FFF'
            }
          },
           labels: {
            style: {
                color: 'black'
            }
        }
      },
      plotOptions: {
          line: {
              dataLabels: {
                  enabled: true,
                  color: 'black'
              },
              enableMouseTracking: true
          },
          series: {
            marker: {
                fillColor: '#764230',
                lineWidth: 2,
                lineColor: '#764230', // inherit from series
            },
            color: '#886747'
        }
      },
      credits : {
        enabled : false
      },
      exporting : {
        enabled : true,
      },
      series: [{
          name: 'No of Joinee',
          data: [0]
      }
    ]
  };

  HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      )
    }, 300);

/** Get the count of month details of DOJ from the database */
  this.service.getMonthCountDetails(this.token)
      .subscribe(
        data => {
          // console.log('data13', data.data);
          this.monthCount = data.data;
          // console.log('data', this.monthCount);
          this.chartOptions = {series : [{
            data: this.monthCount
        }]};
        },    
        error => {
          // console.log('error', error);
        } 
      );

/** Get the count of candidates count details from the database */
  this.service.getCandidatesCountDetails(this.token)
      .subscribe(
        data => {          
          this.candidatesCount = data.data;
          // console.log('data', this.candidatesCount);
        },    
        error => {
          // console.log('error', error);
        } 
      );
   }

    /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();
  }


  test(){
    // console.log('hiii');
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [  
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  } , {
    path: 'login',
    loadChildren: () => import('./+login/login.module').then(m => m.LoginModule),
    data: {
      title : 'Login',
      customLayout: true
    }
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {
      title: 'Dashboard '
    }
  },
  {
    path: 'joinee',
    loadChildren: () => import('./joinee/joinee.module').then(m => m.JoineeModule),
    data: {
      title : 'Joinee',
      customLayout: true
    }
  },
  {
    path: 'role-administration',
    loadChildren: () => import('./role-administration/role-administration.module').then(m => m.RoleAdministrationModule),
    data: {
      title : 'Role Administration'
    }
  },
  {
    path: 'manage-users',
    loadChildren: () => import('./manage-users/manage-users.module').then(m => m.ManageUsersModule),
    data: {
      title : 'Manage Users'
    }
  },
  {
    path: 'manage-designation',
    loadChildren: () => import('./manage-designation/manage-designation.module').then(m => m.ManageDesignationModule),
    data: {
      title : 'Manage Designation'
    }
  },
  {
    path: 'designation',
    loadChildren: () => import('./designation/designation.module').then(m => m.DesignationModule),
    data: {
      title : 'Designation'
    }
  },
  {
    path: 'upcomming-joinee',
    loadChildren: () => import('./upcomming-joinees/upcomming-joinees.module').then(m => m.UpcommingJoineeModule),
    data: {
      title : 'Upcomming Joinee'
    }
  },
  {
    path: 'pre-on-boarding',
    loadChildren: () => import('./pre-on-boarding/pre-on-boarding.module').then(m => m.PreOnBoardingModule),
    data: {
      title: 'Pre On Boarding '
    }
  },
   {
    path: 'form',
    data: {
      title: 'Form',
    },
    children: [
      {
        path: 'input-text',
        loadChildren: () => import('./+form/input-text/input-text.module').then(m => m.InputTextModule),
        data: {
          title: 'Input Text',
        }
      }
    ]
  }, {
    path: 'register',
    loadChildren: () => import('./+register/register.module').then(m => m.RegisterModule),
    data: {
      customLayout: true
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

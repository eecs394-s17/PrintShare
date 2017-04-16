import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
// import { ListPage } from '../pages/list/list';
import { OrdersPage } from '../pages/orders/orders';
import { PaymentPage } from '../pages/payment/payment';
import { ModalContentPage } from '../pages/hello-ionic/modal-content-page';
import { FilePicker } from '../pages/file-picker/file-picker';
import { Confirmation } from '../pages/confirmation-page/confirmation';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    OrdersPage,
    PaymentPage,
    ModalContentPage,
    FilePicker,
    Confirmation
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    OrdersPage,
    PaymentPage,
    ModalContentPage,
    FilePicker,
    Confirmation
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

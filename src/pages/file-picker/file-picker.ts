import { Component } from '@angular/core';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

@Component({
    templateUrl: 'file-picker.html'
})
export class FilePicker {
    homePage = HelloIonicPage;
    items = [
        {
            filename: 'test',
            create_date: '01/02/03',
            author_name: 'Tester Tester',
            size: 1211
        },
        {
            filename: 'test 2',
            create_date: '01/02/03',
            author_name: 'Tester Tester',
            size: 1211
        }
    ];
}

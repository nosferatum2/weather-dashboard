import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { MAIN_LOADER } from './shared/services/spinner/spinner.service';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, SpinnerComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly MAIN_LOADER = MAIN_LOADER;
}

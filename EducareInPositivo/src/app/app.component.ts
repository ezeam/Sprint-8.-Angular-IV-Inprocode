import { TuiRoot } from "@taiga-ui/core";
import { ApplicationRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { filter, take } from "rxjs";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, TuiRoot],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private appRef: ApplicationRef) {}

  ngOnInit() {
    this.appRef.isStable
      .pipe(
        filter(stable => stable),
        take(1)
      )
      .subscribe(() => {
        console.log('Application is stable');
      });
  }
}

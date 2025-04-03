import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RemoveSpacesPipe } from './remove-spaces.pipe'; // Import the Pipe

@NgModule({
  declarations: [
    AppComponent,
    RemoveSpacesPipe // Register the Pipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

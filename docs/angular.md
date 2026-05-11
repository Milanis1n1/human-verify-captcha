### 4. `angular.md`

````markdown
# Angular Integration

To use Web Components in Angular, you must add `CUSTOM_ELEMENTS_SCHEMA` to your module so Angular doesn't throw errors when it sees a tag it doesn't recognize.

**1. Update `app.module.ts`**

```typescript
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import "human-verify-captcha"; // Import the library

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // REQUIRED FOR WEB COMPONENTS
})
export class AppModule {}
```
````

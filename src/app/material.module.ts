import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

const materialModules: any[] = [MatTableModule];

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules],
})
export class MaterialModule {}

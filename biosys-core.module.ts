import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruncatePipe } from './pipes/truncate.pipe';
import { PyToAngularDateFormatConversionPipe } from './pipes/date-conversion.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [TruncatePipe, PyToAngularDateFormatConversionPipe],
    exports: [TruncatePipe, PyToAngularDateFormatConversionPipe]
})
export class BiosysCoreModule {}

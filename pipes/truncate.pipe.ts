import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'truncate'})
export class TruncatePipe implements PipeTransform {
    transform(value: string, length: string): string {
        if (!value) {
            return '';
        }

        let lengthNum = Number(length);

        if (value.length > lengthNum) {
            return '<span class="truncated" title="' + value.replace(/(<([^>]+)>)/ig, '') + '">' +
                value.substr(0, lengthNum - 1).trim() + '&hellip;</span>';
        } else {
            return value;
        }
    }
}

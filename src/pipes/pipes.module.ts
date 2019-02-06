import { NgModule } from '@angular/core';
import { KeyPipe } from './key/key';
import { AmountPipe } from './amount/amount';
@NgModule({
	declarations: [KeyPipe,
    AmountPipe],
	imports: [],
	exports: [KeyPipe,
    AmountPipe]
})
export class PipesModule {}

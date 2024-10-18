import {FormControl} from '@angular/forms';
import {MyValidators} from './my-validators';

fdescribe('MyValidators', () => {
  describe('$correctDate', () => {
    const ctrl = new FormControl('', MyValidators.correctDate);

    it('should return null, when value empty', () => {
      ctrl.setValue('');
      expect(ctrl.errors).toBeNull();
    });

    it('should return null, when value doesnt match pattern', () => {
      ctrl.setValue('20000101');
      expect(ctrl.errors).toBeNull();
    });

    it('should return error, when value is not correct', () => {
      ctrl.setValue('2000-02-30');
      expect(ctrl.errors).toEqual({ correctDate: true })
    });
  });

})

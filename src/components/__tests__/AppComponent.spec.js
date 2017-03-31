import AppComponent from '../AppComponent.jsx';

describe('First test', () => {
    it('should pass', () => {
        function sum(a, b) {
          return a + b;
        }

        expect(sum(5, 3)).toEqual(8);
    });
});

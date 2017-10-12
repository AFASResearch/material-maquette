import { createSelector } from '../src/utilities';
import { expect } from 'chai';

describe('utilities', () => {
  describe('createSelector', () => {
    it('adds optional classes', () => {
      expect(createSelector('div', { me: true, notMe: false })).to.equal('div.me');
    });
    it('adds extra classes', () => {
      expect(createSelector('div', { notMe: false }, ['me'])).to.equal('div.me');
    });
  });
});

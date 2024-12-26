import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorageService = TestBed.inject(LocalStorageService);

    localStorage.clear();
  });

  it('should be created', () => {
    expect(localStorageService).toBeTruthy();
  });

  describe('setItem', () => {
    it('should store the item in localStorage', () => {
      const key = 'testKey';
      const value = 'testValue';
      localStorageService.setItem(key, value);

      expect(localStorage.getItem(key)).toBe(value);
    });
  });

  describe('getItem', () => {
    it('should return the correct item from localStorage', () => {
      const key = 'testKey';
      const value = 'testValue';
      localStorage.setItem(key, value);

      expect(localStorageService.getItem(key)).toBe(value);
    });

    it('should return null if the item does not exist in localStorage', () => {
      const key = 'nonexistentKey';

      expect(localStorageService.getItem(key)).toBeNull();
    });
  });

  describe('removeItem', () => {
    it('should remove the item from localStorage', () => {
      const key = 'testKey';
      localStorage.setItem(key, 'testValue');
      localStorageService.removeItem(key);

      expect(localStorage.getItem(key)).toBeNull();
    });
  });

  describe('clear', () => {
    it('should clear all items from localStorage', () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      localStorageService.clear();

      expect(localStorage.length).toBe(0);
    });
  });
});

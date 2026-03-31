import 'zone.js';
import 'zone.js/testing';
import { vi } from 'vitest';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

declare global {
  var jasmine: any;
  var createSpy: any;
  var spyOn: typeof vi.spyOn;
  var jest: any;
}

// Initialize the Angular testing environment once.
getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting(),
);

if (!globalThis.jasmine) {
  globalThis.jasmine = {
    createSpyObj: (name: string, methods: string[]) => {
      return methods.reduce((acc, method) => {
        acc[method] = vi.fn();
        return acc;
      }, {} as Record<string, any>);
    },
  };
}

if (!globalThis.createSpy) {
  globalThis.createSpy = (name?: string) => vi.fn().mockName(name || 'spy');
}

if (!globalThis.spyOn) {
  globalThis.spyOn = vi.spyOn;
}

if (!globalThis.jest) {
  globalThis.jest = { spyOn: vi.spyOn };
}

import { describe, it, expect } from 'vitest';
import { computePoints } from './pointsLogic';

describe('Point Logic Algorithm', () => {
  
  it('correctly calculates high value transaction (120)', () => {
    expect(computePoints(120)).toBe(90);
  });

  it('correctly calculates mid value transaction (80)', () => {
    expect(computePoints(80)).toBe(30);
  });

  it('handles fractional currency (120.99)', () => {
    expect(computePoints(120.99)).toBe(90);
  });

  it('returns 0 for exactly 50', () => {
    expect(computePoints(50)).toBe(0);
  });

  it('returns 0 for low value (20)', () => {
    expect(computePoints(20)).toBe(0);
  });

  it('ignores negative inputs', () => {
    expect(computePoints(-100)).toBe(0);
  });
});
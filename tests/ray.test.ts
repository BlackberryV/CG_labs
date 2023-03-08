import Ray from '../src/classes/ray/Ray';
import Vector from '../src/classes/vector/Vector';

describe('Ray', () => {
  describe('constructor', () => {
    it('create a ray with the correct origin and direction', () => {
      const origin = new Vector(0, 0, 0);
      const direction = new Vector(1, 2, 3);
      const ray = new Ray(origin, direction);
      expect(ray.origin).toEqual(origin);
      expect(ray.direction).toEqual(direction.normalize());
    });
  });

  describe('pointAtParameter', () => {
    it('return the correct point along the ray', () => {
      const origin = new Vector(0, 0, 0);
      const direction = new Vector(3, 4, 12);
      const ray = new Ray(origin, direction);
      const point = ray.pointAtParameter(26);
      expect(point).toEqual(new Vector(6, 8, 24));
    });
  });

  describe('isPointInside', () => {
    it('return true if the point is on the same side of the origin as the direction', () => {
      const origin = new Vector(0, 0, 0);
      const direction = new Vector(1, 0, 0);
      const ray = new Ray(origin, direction);
      const point = new Vector(2, 0, 0);
      expect(ray.isPointInside(point)).toBe(true);
    });

    it('return false if the point is on the opposite side of the origin from the direction', () => {
      const origin = new Vector(0, 0, 0);
      const direction = new Vector(1, 0, 0);
      const ray = new Ray(origin, direction);
      const point = new Vector(-5, 0, 0);
      expect(ray.isPointInside(point)).toBe(false);
    });

    it('return true if the point is exactly on the origin', () => {
      const origin = new Vector(0, 0, 0);
      const direction = new Vector(1, 0, 0);
      const ray = new Ray(origin, direction);
      const point = new Vector(0, 0, 0);
      expect(ray.isPointInside(point)).toBe(true);
    });
  });

});

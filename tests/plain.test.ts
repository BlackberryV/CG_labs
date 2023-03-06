import Plane from '../src/classes/plain/Plain';
import Ray from '../src/classes/ray/Ray';
import Vector from '../src/classes/vector/Vector';

describe('Plane', () => {
  const normal = new Vector(0, 0, 1);
  const point = new Vector(0, 0, 5);
  const plane = new Plane(normal, point);

  describe('getIntersection', () => {
    it('return the correct intersection point for a ray that intersects the plane', () => {
      const origin = new Vector(0, 0, 0);
      const direction = new Vector(0, 0, 1);
      const ray = new Ray(origin, direction);
      const expected = new Vector(0, 0, 5);
      expect(plane.getIntersection(ray)).toEqual(expected);
    });

    it('return null if the ray is parallel to the plane', () => {
      const origin = new Vector(0, 0, 0);
      const direction = new Vector(0, 1, 0);
      const ray = new Ray(origin, direction);
      expect(plane.getIntersection(ray)).toBeNull();
    });

    it('return null if the intersection point is behind the ray origin', () => {
      const origin = new Vector(0, 0, 0);
      const direction = new Vector(0, 0, -1);
      const ray = new Ray(origin, direction);
      expect(plane.getIntersection(ray)).toBeNull();
    });
  });
});

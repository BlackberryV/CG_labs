import Ray from "../src/classes/ray/Ray";
import Sphere from "../src/classes/sphere/Sphere";
import Vector from "../src/classes/vector/Vector";

describe('Sphere', () => {
  const center = new Vector(0, 0, 0);
  const radius = 3;
  const sphere = new Sphere(center, radius);

  describe('getIntersection', () => {
    it('return vectors of intersection (null)', () => {
      const origin = new Vector(0, 6, -6);
      const direction = new Vector(0, 0, 3);
      const ray = new Ray(origin, direction);

      expect(sphere.getIntersection(ray)).toBeNull();
    });

    it('return intersection point when ray intersects sphere', () => {
        const origin = new Vector(0, 0, -6);
        const direction = new Vector(0, 0, 3);
        const ray = new Ray(origin, direction);
  
        expect(sphere.getIntersection(ray)).toEqual(new Vector(0, 0, -3));
      });
  });
});

import Disk from "../src/classes/disk/Disk";
import Ray from "../src/classes/ray/Ray";
import Vector from "../src/classes/vector/Vector";

describe('Disk', () => {
  const center = new Vector(0, 0, 0);
  const normal = new Vector(0, 0, 1);
  const radius = 3;
  const disk = new Disk(center, normal, radius);

  describe('getIntersection', () => {
    it('should return an empty array if the ray is parallel to the disk', () => {
      const origin = new Vector(0, 0, 1);
      const direction = new Vector(0, 1, 0);
      const ray = new Ray(origin, direction);
      expect(disk.getIntersection(ray)).toEqual([]);
    });

    it('should return an empty array if the intersection point is behind the ray origin', () => {
      const origin = new Vector(0, 0, -3);
      const direction = new Vector(0, 0, -1);
      const ray = new Ray(origin, direction);
      expect(disk.getIntersection(ray)).toEqual([]);
    });

    it('should return an empty array if the intersection point is outside the disk', () => {
      const origin = new Vector(0, 0, 1);
      const direction = new Vector(0, 0, 1);
      const ray = new Ray(origin, direction);
      expect(disk.getIntersection(ray)).toEqual([]);
    });

    it('should return the correct intersection point for a ray that intersects the disk', () => {
      const origin = new Vector(0, 0, -1);
      const direction = new Vector(0, 0, 1);
      const ray = new Ray(origin, direction);
      const expected = [new Vector(0, 0, 0)];
      expect(disk.getIntersection(ray)).toEqual(expected);
    });
  });
});

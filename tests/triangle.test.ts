import Vector from "../src/classes/vector/Vector";
import Triangle from "../src/classes/triangle/Triangle";
import Ray from "../src/classes/ray/Ray";

describe("Triangle", () => {
  const triangle = new Triangle(
    new Vector(0, 0, 0),
    new Vector(1, 0, 0),
    new Vector(0, 1, 0)
  );

  describe("#intersect", () => {
    it("should return intersection point if ray intersects triangle", () => {
      const ray = new Ray(new Vector(0.5, 0.5, 1), new Vector(0, 0, -1));
      const intersection = triangle.intersect(ray);
      expect(intersection).toEqual(new Vector(0.5, 0.5, 0));
    });

    it("should return null if ray is parallel to triangle", () => {
      const ray = new Ray(new Vector(0.5, 0.5, 1), new Vector(0, 1, 0));
      const intersection = triangle.intersect(ray);
      expect(intersection).toBeNull();
    });

    it("should return null if intersection point is outside the triangle", () => {
      const ray = new Ray(new Vector(2, 2, 1), new Vector(0, 0, -1));
      const intersection = triangle.intersect(ray);
      expect(intersection).toBeNull();
    });

    it("should return null if ray starts behind the triangle", () => {
      const ray = new Ray(new Vector(0.5, 0.5, 1), new Vector(0, 0, 1));
      const intersection = triangle.intersect(ray);
      expect(intersection).toBeNull();
    });
  });
});
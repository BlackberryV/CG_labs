import Vector from "../src/classes/vector/Vector";
import Vernex from "../src/classes/vertex/Vertex";

describe('Vertex', () => {
  describe('getRayTo', () => {
    it('ray pointing from the source vertex to the destination vertex', () => {
      const start = new Vernex(new Vector(0, 0, 0));
      const destination = new Vernex(new Vector(1, 1, 1));
      const ray = start.getRayTo(destination);
      expect(ray.origin).toEqual(start.position);
      expect(ray.direction).toEqual(destination.position.subtract(start.position).normalize());
    });
  });

  describe('getLengthTo', () => {
    it('distance between two vertexes', () => {
      const vertex1 = new Vernex(new Vector(0, 0, 0));
      const vertex2 = new Vernex(new Vector(1, 2, 3));
      expect(vertex1.getLengthTo(vertex2)).toBeCloseTo(3.74);
    });
  });

  describe('toVector', () => {
    it('position of the vertex as a vector', () => {
      const vertex = new Vernex(new Vector(1, 2, 3));
      expect(vertex.toVector()).toEqual(new Vector(1, 2, 3));
    });
  });
});

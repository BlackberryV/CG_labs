import Vector from '../src/classes/vector/Vector';

describe('Vector', () => {
  describe('add', () => {
    it('add two vectors', () => {
      const v1 = new Vector(1, 1, 2);
      const v2 = new Vector(4, 2, 3);
      const result = v1.add(v2);
      expect(result).toEqual(new Vector(5, 3, 5));
    });
  });

  describe('subtract', () => {
    it('subtract two vectors', () => {
      const v1 = new Vector(1, 1, 1);
      const v2 = new Vector(2, 2, 2);
      const result = v1.subtract(v2);
      expect(result).toEqual(new Vector(-1, -1, -1));
    });
  });

  describe('multiply', () => {
    it('multiply a vector by a scalar', () => {
      const vector = new Vector(1, 2, 3);
      const result = vector.multiply(2);
      expect(result).toEqual(new Vector(2, 4, 6));
    });
  });

  describe('dot', () => {
    it('calculate the dot product of two vectors', () => {
      const v1 = new Vector(0, 1, 2);
      const v2 = new Vector(1, 2, 3);
      const result = v1.dot(v2);
      expect(result).toEqual(8);
    });
  });

  describe('getNormal', () => {
    it('get normal of a vector', () => {
      const vector = new Vector(1, 2, 3);
      const result = vector.getNormal(new Vector(1, 1, 1));
      const m = Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);
      expect(result).toEqual(new Vector(-1, 2, -1));
    });
  });

  describe('normalize', () => {
    it('normalize a vector', () => {
      const vector = new Vector(1, 2, 3);
      const result = vector.normalize();
      const m = Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);
      expect(result).toEqual(new Vector(1 / m, 2 / m, 3 / m));
    });
  });

  describe('getDistanceTo', () => {
    it('calculate the distance between two vectors', () => {
      const v1 = new Vector(0, 1, 2);
      const v2 = new Vector(5, 4, 3);
      const result = v1.getDistanceTo(v2);
      expect(result).toBeCloseTo(5.92);
    });
  });
});

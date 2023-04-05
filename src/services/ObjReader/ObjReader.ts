import * as fs from 'fs';
import Triangle from "../../classes/triangle/Triangle";
import Vector from "../../classes/vector/Vector";

export default class ObjReader {
  static readObjFile(filename: string): Triangle[] {
    const fileData = fs.readFileSync(filename, 'utf-8');
    const lines = fileData.split('\n');
    const vertices: Vector[] = [];
    const triangles: Triangle[] = [];

    for (const line of lines) {
      const tokens = line.trim().split(/\s+/);

      if (tokens[0] === 'v') {
        const x = parseFloat(tokens[1]);
        const y = parseFloat(tokens[2]);
        const z = parseFloat(tokens[3]);
        vertices.push(new Vector(x, y, z));
      } else if (tokens[0] === 'f') {
        const vertexIndices: number[] = [];

        for (let i = 1; i < tokens.length; i++) {
          const vertexTokens = tokens[i].split('/');
          const vertexIndex = parseInt(vertexTokens[0], 10) - 1;
          vertexIndices.push(vertexIndex);
        }

        if (vertexIndices.length === 3) {
          const v0 = vertices[vertexIndices[0]];
          const v1 = vertices[vertexIndices[1]];
          const v2 = vertices[vertexIndices[2]];
          const triangle = new Triangle(v0, v1, v2);
          triangles.push(triangle);
        }
      }
    }

    return triangles;
  }
}
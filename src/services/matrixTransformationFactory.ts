import Matrix from '../classes/matrix/Matrix';
import Vector from '../classes/vector/Vector';

export enum MatrixTransformation {
  TRANSLATE = 'TRANSLATE',
  SCALE = 'SCALE',
  ROTATE = 'ROTATE',
}

export type MatrixTransformations =
  | {
      type: MatrixTransformation.SCALE;
      scaleVector: Vector;
    }
  | {
      type: MatrixTransformation.TRANSLATE;
      translation: Vector;
    }
  | {
      type: MatrixTransformation.ROTATE;
      degrees: number;
      axis: Vector;
    };

export const transformationFactory = (
  transformations: MatrixTransformations[],
  vector: Vector
) => {
  return transformations.reduce((transformedVector, transformation) => {
    switch (transformation.type) {
      case MatrixTransformation.SCALE:
        return Matrix.scale(transformedVector, transformation.scaleVector);
      case MatrixTransformation.ROTATE:
        return Matrix.rotateAroundAxis(
          transformedVector,
          transformation.axis,
          transformation.degrees
        );
      case MatrixTransformation.TRANSLATE:
        return Matrix.translate(transformedVector, transformation.translation);
      default:
        return transformedVector;
    }
  }, vector);
};

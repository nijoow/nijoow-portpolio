declare module 'three/examples/jsm/math/MeshSurfaceSampler.js' {
  import type { Mesh, Vector3 } from 'three';

  export class MeshSurfaceSampler {
    constructor(mesh: Mesh);
    setWeightAttribute(name: string | null): this;
    build(): this;
    sample(targetPosition: Vector3, targetNormal?: Vector3): this;
  }
}

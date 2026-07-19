export interface ParticleGeometryRequest {
  positions: Float32Array;
  indices: Uint32Array | null;
  count: number;
}

export interface ParticleGeometryResult {
  positions: Float32Array;
  scatters: Float32Array;
  randoms: Float32Array;
  glintPositions: Float32Array;
  glintScatters: Float32Array;
  glintRandoms: Float32Array;
}

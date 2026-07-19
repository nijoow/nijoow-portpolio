/// <reference lib="webworker" />

import type {
  ParticleGeometryRequest,
  ParticleGeometryResult,
} from './particleGeometry.types';

const SEED = 0x9e3779b9;
const LOGO_SCALE = 26;
const GLINT_THRESHOLD = 0.86;

function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function resolveVertexIndex(
  indices: Uint32Array | null,
  triangleIndex: number,
  corner: number,
) {
  const offset = triangleIndex * 3 + corner;
  return indices?.[offset] ?? offset;
}

function readTransformedVertex(
  source: Float32Array,
  vertexIndex: number,
  target: Float64Array,
) {
  const offset = vertexIndex * 3;
  target[0] = (source[offset] ?? 0) * LOGO_SCALE;
  target[1] = -(source[offset + 2] ?? 0) * LOGO_SCALE;
  target[2] = (source[offset + 1] ?? 0) * LOGO_SCALE;
}

function coordinate(values: Float64Array, axis: number) {
  return values[axis] ?? 0;
}

function triangleArea(a: Float64Array, b: Float64Array, c: Float64Array) {
  const abX = coordinate(b, 0) - coordinate(a, 0);
  const abY = coordinate(b, 1) - coordinate(a, 1);
  const abZ = coordinate(b, 2) - coordinate(a, 2);
  const acX = coordinate(c, 0) - coordinate(a, 0);
  const acY = coordinate(c, 1) - coordinate(a, 1);
  const acZ = coordinate(c, 2) - coordinate(a, 2);
  const crossX = abY * acZ - abZ * acY;
  const crossY = abZ * acX - abX * acZ;
  const crossZ = abX * acY - abY * acX;
  return Math.hypot(crossX, crossY, crossZ) * 0.5;
}

function buildCumulativeAreas(
  source: Float32Array,
  indices: Uint32Array | null,
) {
  const triangleCount = Math.floor((indices?.length ?? source.length / 3) / 3);
  const cumulativeAreas = new Float64Array(triangleCount);
  const a = new Float64Array(3);
  const b = new Float64Array(3);
  const c = new Float64Array(3);
  let totalArea = 0;

  for (let triangleIndex = 0; triangleIndex < triangleCount; triangleIndex++) {
    readTransformedVertex(
      source,
      resolveVertexIndex(indices, triangleIndex, 0),
      a,
    );
    readTransformedVertex(
      source,
      resolveVertexIndex(indices, triangleIndex, 1),
      b,
    );
    readTransformedVertex(
      source,
      resolveVertexIndex(indices, triangleIndex, 2),
      c,
    );
    totalArea += triangleArea(a, b, c);
    cumulativeAreas[triangleIndex] = totalArea;
  }

  return { cumulativeAreas, totalArea };
}

function findTriangle(cumulativeAreas: Float64Array, targetArea: number) {
  let low = 0;
  let high = cumulativeAreas.length - 1;

  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if ((cumulativeAreas[middle] ?? 0) < targetArea) low = middle + 1;
    else high = middle;
  }

  return low;
}

function sampleSurface(
  source: Float32Array,
  indices: Uint32Array | null,
  count: number,
  random: () => number,
) {
  const { cumulativeAreas, totalArea } = buildCumulativeAreas(source, indices);
  const positions = new Float32Array(count * 3);
  const randoms = new Float32Array(count);
  const centroid = new Float64Array(3);
  const a = new Float64Array(3);
  const b = new Float64Array(3);
  const c = new Float64Array(3);

  for (let index = 0; index < count; index++) {
    const triangleIndex = findTriangle(cumulativeAreas, random() * totalArea);
    readTransformedVertex(
      source,
      resolveVertexIndex(indices, triangleIndex, 0),
      a,
    );
    readTransformedVertex(
      source,
      resolveVertexIndex(indices, triangleIndex, 1),
      b,
    );
    readTransformedVertex(
      source,
      resolveVertexIndex(indices, triangleIndex, 2),
      c,
    );

    const root = Math.sqrt(random());
    const mix = random();
    const weightA = 1 - root;
    const weightB = root * (1 - mix);
    const weightC = root * mix;
    const offset = index * 3;

    for (let axis = 0; axis < 3; axis++) {
      const value =
        coordinate(a, axis) * weightA +
        coordinate(b, axis) * weightB +
        coordinate(c, axis) * weightC;
      positions[offset + axis] = value;
      centroid[axis] = coordinate(centroid, axis) + value;
    }
    randoms[index] = random();
  }

  for (let axis = 0; axis < 3; axis++) {
    centroid[axis] = coordinate(centroid, axis) / count;
  }
  return { positions, randoms, centroid };
}

function centerPositions(positions: Float32Array, centroid: Float64Array) {
  let maxRadius = 0.001;

  for (let offset = 0; offset < positions.length; offset += 3) {
    const x = (positions[offset] ?? 0) - coordinate(centroid, 0);
    const y = (positions[offset + 1] ?? 0) - coordinate(centroid, 1);
    const z = (positions[offset + 2] ?? 0) - coordinate(centroid, 2);
    positions[offset] = x;
    positions[offset + 1] = y;
    positions[offset + 2] = z;
    maxRadius = Math.max(maxRadius, Math.hypot(x, y, z));
  }

  return maxRadius;
}

function createScatters(
  count: number,
  maxRadius: number,
  random: () => number,
) {
  const scatters = new Float32Array(count * 3);

  for (let index = 0; index < count; index++) {
    const vertical = random() * 2 - 1;
    const angle = random() * Math.PI * 2;
    const planar = Math.sqrt(1 - vertical * vertical);
    const distance = maxRadius * (0.6 + random() * 2.4);
    const offset = index * 3;
    scatters[offset] = Math.cos(angle) * planar * distance;
    scatters[offset + 1] = Math.sin(angle) * planar * distance;
    scatters[offset + 2] = vertical * distance;
  }

  return scatters;
}

function createGlintGeometry(
  positions: Float32Array,
  scatters: Float32Array,
  randoms: Float32Array,
) {
  const glintCount = randoms.reduce(
    (count, value) => count + Number(value > GLINT_THRESHOLD),
    0,
  );
  const glintPositions = new Float32Array(glintCount * 3);
  const glintScatters = new Float32Array(glintCount * 3);
  const glintRandoms = new Float32Array(glintCount);
  let targetIndex = 0;

  randoms.forEach((value, sourceIndex) => {
    if (value <= GLINT_THRESHOLD) return;
    const sourceOffset = sourceIndex * 3;
    const targetOffset = targetIndex * 3;
    glintPositions.set(
      positions.subarray(sourceOffset, sourceOffset + 3),
      targetOffset,
    );
    glintScatters.set(
      scatters.subarray(sourceOffset, sourceOffset + 3),
      targetOffset,
    );
    glintRandoms[targetIndex] = value;
    targetIndex++;
  });

  return { glintPositions, glintScatters, glintRandoms };
}

function generateParticleGeometry({
  positions: source,
  indices,
  count,
}: ParticleGeometryRequest): ParticleGeometryResult {
  const random = mulberry32(SEED);
  const { positions, randoms, centroid } = sampleSurface(
    source,
    indices,
    count,
    random,
  );
  const maxRadius = centerPositions(positions, centroid);
  const scatters = createScatters(count, maxRadius, random);

  return {
    positions,
    scatters,
    randoms,
    ...createGlintGeometry(positions, scatters, randoms),
  };
}

self.onmessage = (event: MessageEvent<ParticleGeometryRequest>) => {
  const result = generateParticleGeometry(event.data);
  self.postMessage(result, {
    transfer: [
      result.positions.buffer,
      result.scatters.buffer,
      result.randoms.buffer,
      result.glintPositions.buffer,
      result.glintScatters.buffer,
      result.glintRandoms.buffer,
    ],
  });
};

export {};

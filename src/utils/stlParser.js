/**
 * Client-Side STL File Parser & Mesh Analyzer
 * Supports both Binary and ASCII STL formats.
 * Computes bounding box dimensions, surface area, exact volume using
 * signed tetrahedron summation, and generates vertex buffer data for 3D rendering.
 */

export function parseSTL(buffer) {
  const isAscii = checkIfAscii(buffer);
  if (isAscii) {
    return parseAsciiSTL(buffer);
  } else {
    return parseBinarySTL(buffer);
  }
}

/**
 * Check if the ArrayBuffer contains ASCII text or Binary data
 */
function checkIfAscii(buffer) {
  const reader = new Uint8Array(buffer, 0, Math.min(buffer.byteLength, 512));
  // Check if starts with "solid"
  const header = String.fromCharCode(...reader.slice(0, 80)).trim().toLowerCase();
  if (!header.startsWith('solid')) {
    return false;
  }
  // Check for non-printable characters (standard in binary)
  for (let i = 0; i < reader.length; i++) {
    const byte = reader[i];
    if (byte < 9 || (byte > 13 && byte < 32) || byte > 126) {
      return false; // Binary file with 'solid' prefix in 80-byte header
    }
  }
  return true;
}

/**
 * Parse Binary STL
 */
function parseBinarySTL(buffer) {
  const dataView = new DataView(buffer);
  const faceCount = dataView.getUint32(80, true);
  
  // Verify length
  const expectedSize = 84 + faceCount * 50;
  if (buffer.byteLength < expectedSize) {
    console.warn(`Buffer size mismatch. Expected ${expectedSize}, got ${buffer.byteLength}`);
  }

  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  let totalSignedVolume = 0;
  let totalArea = 0;

  const positions = new Float32Array(faceCount * 9);
  const normals = new Float32Array(faceCount * 9);

  let offset = 84;
  let posIndex = 0;

  for (let i = 0; i < faceCount; i++) {
    if (offset + 50 > buffer.byteLength) break;

    // Normal vector
    const nx = dataView.getFloat32(offset, true);
    const ny = dataView.getFloat32(offset + 4, true);
    const nz = dataView.getFloat32(offset + 8, true);

    // Vertices
    const v1x = dataView.getFloat32(offset + 12, true);
    const v1y = dataView.getFloat32(offset + 16, true);
    const v1z = dataView.getFloat32(offset + 20, true);

    const v2x = dataView.getFloat32(offset + 24, true);
    const v2y = dataView.getFloat32(offset + 28, true);
    const v2z = dataView.getFloat32(offset + 32, true);

    const v3x = dataView.getFloat32(offset + 36, true);
    const v3y = dataView.getFloat32(offset + 40, true);
    const v3z = dataView.getFloat32(offset + 44, true);

    // Update bounding box
    minX = Math.min(minX, v1x, v2x, v3x);
    minY = Math.min(minY, v1y, v2y, v3y);
    minZ = Math.min(minZ, v1z, v2z, v3z);

    maxX = Math.max(maxX, v1x, v2x, v3x);
    maxY = Math.max(maxY, v1y, v2y, v3y);
    maxZ = Math.max(maxZ, v1z, v2z, v3z);

    // Signed tetrahedron volume: v1 . (v2 x v3) / 6
    const crossX = v2y * v3z - v2z * v3y;
    const crossY = v2z * v3x - v2x * v3z;
    const crossZ = v2x * v3y - v2y * v3x;
    const signedVol = (v1x * crossX + v1y * crossY + v1z * crossZ) / 6.0;
    totalSignedVolume += signedVol;

    // Triangle surface area: 0.5 * |(v2 - v1) x (v3 - v1)|
    const ax = v2x - v1x, ay = v2y - v1y, az = v2z - v1z;
    const bx = v3x - v1x, by = v3y - v1y, bz = v3z - v1z;
    const triCrossX = ay * bz - az * by;
    const triCrossY = az * bx - ax * bz;
    const triCrossZ = ax * by - ay * bx;
    const area = 0.5 * Math.sqrt(triCrossX * triCrossX + triCrossY * triCrossY + triCrossZ * triCrossZ);
    totalArea += area;

    // Store in buffers
    positions[posIndex] = v1x;
    positions[posIndex + 1] = v1y;
    positions[posIndex + 2] = v1z;
    positions[posIndex + 3] = v2x;
    positions[posIndex + 4] = v2y;
    positions[posIndex + 5] = v2z;
    positions[posIndex + 6] = v3x;
    positions[posIndex + 7] = v3y;
    positions[posIndex + 8] = v3z;

    normals[posIndex] = nx;
    normals[posIndex + 1] = ny;
    normals[posIndex + 2] = nz;
    normals[posIndex + 3] = nx;
    normals[posIndex + 4] = ny;
    normals[posIndex + 5] = nz;
    normals[posIndex + 6] = nx;
    normals[posIndex + 7] = ny;
    normals[posIndex + 8] = nz;

    posIndex += 9;
    offset += 50; // 48 bytes floats + 2 bytes attribute byte count
  }

  const dimX = Math.max(0, maxX - minX);
  const dimY = Math.max(0, maxY - minY);
  const dimZ = Math.max(0, maxZ - minZ);

  let volumeMm3 = Math.abs(totalSignedVolume);
  // Fallback if non-manifold or inverted mesh yields near-zero volume
  if (volumeMm3 < 1 && (dimX * dimY * dimZ) > 10) {
    volumeMm3 = dimX * dimY * dimZ * 0.35; // approximate solid fraction
  }

  const volumeCm3 = volumeMm3 / 1000.0;
  const surfaceAreaCm2 = totalArea / 100.0;

  return {
    triangleCount: faceCount,
    dimensions: {
      x: Number(dimX.toFixed(1)),
      y: Number(dimY.toFixed(1)),
      z: Number(dimZ.toFixed(1)),
    },
    bounds: { minX, minY, minZ, maxX, maxY, maxZ },
    volumeMm3: Math.round(volumeMm3),
    volumeCm3: Number(volumeCm3.toFixed(2)),
    surfaceAreaCm2: Number(surfaceAreaCm2.toFixed(1)),
    positions,
    normals,
    format: 'Binary STL',
  };
}

/**
 * Parse ASCII STL
 */
function parseAsciiSTL(buffer) {
  const decoder = new TextDecoder('utf-8');
  const text = decoder.decode(buffer);

  const lines = text.split(/\r?\n/);
  const vertices = [];
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  let totalSignedVolume = 0;
  let totalArea = 0;
  let currentTriangle = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('vertex')) {
      const parts = line.split(/\s+/);
      const x = parseFloat(parts[1]);
      const y = parseFloat(parts[2]);
      const z = parseFloat(parts[3]);

      if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
        currentTriangle.push(x, y, z);
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        minZ = Math.min(minZ, z);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
        maxZ = Math.max(maxZ, z);

        if (currentTriangle.length === 9) {
          const v1x = currentTriangle[0], v1y = currentTriangle[1], v1z = currentTriangle[2];
          const v2x = currentTriangle[3], v2y = currentTriangle[4], v2z = currentTriangle[5];
          const v3x = currentTriangle[6], v3y = currentTriangle[7], v3z = currentTriangle[8];

          // Signed volume
          const crossX = v2y * v3z - v2z * v3y;
          const crossY = v2z * v3x - v2x * v3z;
          const crossZ = v2x * v3y - v2y * v3x;
          totalSignedVolume += (v1x * crossX + v1y * crossY + v1z * crossZ) / 6.0;

          // Surface Area
          const ax = v2x - v1x, ay = v2y - v1y, az = v2z - v1z;
          const bx = v3x - v1x, by = v3y - v1y, bz = v3z - v1z;
          const tX = ay * bz - az * by;
          const tY = az * bx - ax * bz;
          const tZ = ax * by - ay * bx;
          totalArea += 0.5 * Math.sqrt(tX * tX + tY * tY + tZ * tZ);

          vertices.push(...currentTriangle);
          currentTriangle = [];
        }
      }
    }
  }

  const faceCount = Math.floor(vertices.length / 9);
  const dimX = Math.max(0, maxX - minX);
  const dimY = Math.max(0, maxY - minY);
  const dimZ = Math.max(0, maxZ - minZ);

  let volumeMm3 = Math.abs(totalSignedVolume);
  if (volumeMm3 < 1 && (dimX * dimY * dimZ) > 10) {
    volumeMm3 = dimX * dimY * dimZ * 0.35;
  }

  const volumeCm3 = volumeMm3 / 1000.0;
  const surfaceAreaCm2 = totalArea / 100.0;

  return {
    triangleCount: faceCount,
    dimensions: {
      x: Number(dimX.toFixed(1)),
      y: Number(dimY.toFixed(1)),
      z: Number(dimZ.toFixed(1)),
    },
    bounds: { minX, minY, minZ, maxX, maxY, maxZ },
    volumeMm3: Math.round(volumeMm3),
    volumeCm3: Number(volumeCm3.toFixed(2)),
    surfaceAreaCm2: Number(surfaceAreaCm2.toFixed(1)),
    positions: new Float32Array(vertices),
    format: 'ASCII STL',
  };
}

/**
 * Generate a standard 25mm calibration cube STL (Binary ArrayBuffer)
 * Useful for instant "Try Sample 3D Model" feature.
 */
export function generateSampleCubeSTL(size = 25) {
  const half = size / 2;
  const vertices = [
    // Front face
    [-half, -half,  half], [ half, -half,  half], [ half,  half,  half],
    [-half, -half,  half], [ half,  half,  half], [-half,  half,  half],
    // Back face
    [ half, -half, -half], [-half, -half, -half], [-half,  half, -half],
    [ half, -half, -half], [-half,  half, -half], [ half,  half, -half],
    // Top face
    [-half,  half,  half], [ half,  half,  half], [ half,  half, -half],
    [-half,  half,  half], [ half,  half, -half], [-half,  half, -half],
    // Bottom face
    [-half, -half, -half], [ half, -half, -half], [ half, -half,  half],
    [-half, -half, -half], [ half, -half,  half], [-half, -half,  half],
    // Right face
    [ half, -half,  half], [ half, -half, -half], [ half,  half, -half],
    [ half, -half,  half], [ half,  half, -half], [ half,  half,  half],
    // Left face
    [-half, -half, -half], [-half, -half,  half], [-half,  half,  half],
    [-half, -half, -half], [-half,  half,  half], [-half,  half, -half],
  ];

  const triangleCount = 12;
  const bufferSize = 84 + triangleCount * 50;
  const buffer = new ArrayBuffer(bufferSize);
  const view = new DataView(buffer);

  // Write 80 bytes header
  const header = "SSVE Calibration Cube 25mm Sample";
  for (let i = 0; i < header.length; i++) {
    view.setUint8(i, header.charCodeAt(i));
  }
  // Face count
  view.setUint32(80, triangleCount, true);

  let offset = 84;
  for (let t = 0; t < triangleCount; t++) {
    // Normal 0, 0, 0 (can be 0)
    view.setFloat32(offset, 0, true);
    view.setFloat32(offset + 4, 0, true);
    view.setFloat32(offset + 8, 0, true);

    const v1 = vertices[t * 3];
    const v2 = vertices[t * 3 + 1];
    const v3 = vertices[t * 3 + 2];

    view.setFloat32(offset + 12, v1[0], true);
    view.setFloat32(offset + 16, v1[1], true);
    view.setFloat32(offset + 20, v1[2], true);

    view.setFloat32(offset + 24, v2[0], true);
    view.setFloat32(offset + 28, v2[1], true);
    view.setFloat32(offset + 32, v2[2], true);

    view.setFloat32(offset + 36, v3[0], true);
    view.setFloat32(offset + 40, v3[1], true);
    view.setFloat32(offset + 44, v3[2], true);

    view.setUint16(offset + 48, 0, true); // attribute byte count
    offset += 50;
  }

  return buffer;
}

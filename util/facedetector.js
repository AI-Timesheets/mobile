export function isFullFace(classifications) {
  return classifications.leftEyeOpenProbability >= 0.95 &&
    classifications.rightEyeOpenProbability >= 0.95;
}
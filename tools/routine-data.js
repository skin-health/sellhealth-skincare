/*
 * Routine planner data (Phase D, v1).
 * Editorial guidance, not medical advice.
 *
 * Timing and photosensitivity values are NOT set in v1.
 * Spec D2 requires a source for every value. No sourced values exist yet.
 * The planner therefore uses only the 42 explicit conflict rules
 * (window.DERM_ROUTINE_RULES in conflict-matrix.js) and lets the user place each active.
 * When the owner supplies sourced values, add them to timing below.
 */
window.DERM_ROUTINE_DATA = Object.freeze({
  version: 1,
  timing: Object.freeze({})
});

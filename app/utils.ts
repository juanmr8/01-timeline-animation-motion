/**
 * Simplified Animation Helpers for Timeline
 *
 * Much simpler approach - just enhanced versions of your original functions
 * that work correctly and are easy to use in timeline animations.
 */

// ============================================================================
// SIMPLE MEASUREMENT UTILITIES
// ============================================================================

/**
 * Get element measurement safely
 */
export const getMeasurement = (
  measurements: Map<string, DOMRect>,
  selector: string
): DOMRect | null => {
  return measurements.get(selector) || null;
};

/**
 * Get viewport dimensions
 */
export const getViewport = (measurements: Map<string, DOMRect>) => {
  const viewport = measurements.get('viewport');
  return {
    width: viewport?.width ?? window.innerWidth,
    height: viewport?.height ?? window.innerHeight,
  };
};

// ============================================================================
// SIMPLE SAFE MOVEMENT FUNCTIONS
// ============================================================================

/**
 * Get maximum safe movement in pixels
 * Returns how far an element can move without going out of bounds
 */
export const getSafeMovement = (
  measurements: Map<string, DOMRect>,
  selector: string,
  direction: 'up' | 'down' | 'left' | 'right',
  buffer: number = 0
): number => {
  const element = getMeasurement(measurements, selector);
  const viewport = getViewport(measurements);

  if (!element) return 0;

  switch (direction) {
    case 'up':
      return Math.max(0, element.top - buffer);
    case 'down':
      return Math.max(0, viewport.height - element.bottom - buffer);
    case 'left':
      return Math.max(0, element.left - buffer);
    case 'right':
      return Math.max(0, viewport.width - element.right - buffer);
    default:
      return 0;
  }
};

/**
 * Move element to left edge safely
 */
export const moveToLeftEdge = (
  measurements: Map<string, DOMRect>,
  selector: string,
  buffer: number = 0
): string => {
  const maxMovement = getSafeMovement(measurements, selector, 'left', buffer);
  return `-${maxMovement}px`;
};

/**
 * Move element to right edge safely
 */
export const moveToRightEdge = (
  measurements: Map<string, DOMRect>,
  selector: string,
  buffer: number = 0
): string => {
  const maxMovement = getSafeMovement(measurements, selector, 'right', buffer);
  return `${maxMovement}px`;
};

/**
 * Move element to top edge safely
 */
export const moveToTopEdge = (
  measurements: Map<string, DOMRect>,
  selector: string,
  buffer: number = 0
): string => {
  const maxMovement = getSafeMovement(measurements, selector, 'up', buffer);
  return `-${maxMovement}px`;
};

/**
 * Move element to bottom edge safely
 */
export const moveToBottomEdge = (
  measurements: Map<string, DOMRect>,
  selector: string,
  buffer: number = 0
): string => {
  const maxMovement = getSafeMovement(measurements, selector, 'down', buffer);
  return `${maxMovement}px`;
};

/**
 * Clamp a movement value to safe boundaries
 */
export const clampToSafe = (
  measurements: Map<string, DOMRect>,
  selector: string,
  direction: 'up' | 'down' | 'left' | 'right',
  desiredPx: number,
  buffer: number = 20
): string => {
  const maxSafe = getSafeMovement(measurements, selector, direction, buffer);
  const clampedValue = Math.min(Math.abs(desiredPx), maxSafe);

  // Return with correct sign
  if (direction === 'up' || direction === 'left') {
    return `-${clampedValue}px`;
  } else {
    return `${clampedValue}px`;
  }
};

// ============================================================================
// VIEWPORT EXIT FUNCTIONS (MOVE ELEMENTS COMPLETELY OFF-SCREEN)
// ============================================================================

/**
 * Position element completely outside viewport to the left
 */
export const exitLeft = (
  measurements: Map<string, DOMRect>,
  selector: string,
  buffer: number = 0
): string => {
  const element = getMeasurement(measurements, selector);
  if (!element) return '0px';

  // Move element so its right edge is at the left edge of viewport (plus buffer)
  const offsetNeeded = -(element.right + buffer);
  return `${offsetNeeded}px`;
};

/**
 * Position element completely outside viewport to the right
 */
export const exitRight = (
  measurements: Map<string, DOMRect>,
  selector: string,
  buffer: number = 0
): string => {
  const element = getMeasurement(measurements, selector);
  const viewport = getViewport(measurements);
  if (!element) return '0px';

  // Move element so its left edge is at the right edge of viewport (plus buffer)
  const offsetNeeded = viewport.width - element.left + buffer;
  return `${offsetNeeded}px`;
};

/**
 * Position element completely outside viewport to the top
 */
export const exitTop = (
  measurements: Map<string, DOMRect>,
  selector: string,
  buffer: number = 0
): string => {
  const element = getMeasurement(measurements, selector);
  if (!element) return '0px';

  // Move element so its bottom edge is at the top edge of viewport (plus buffer)
  const offsetNeeded = -(element.bottom + buffer);
  return `${offsetNeeded}px`;
};

/**
 * Position element completely outside viewport to the bottom
 */
export const exitBottom = (
  measurements: Map<string, DOMRect>,
  selector: string,
  buffer: number = 0
): string => {
  const element = getMeasurement(measurements, selector);
  const viewport = getViewport(measurements);
  if (!element) return '0px';

  // Move element so its top edge is at the bottom edge of viewport (plus buffer)
  const offsetNeeded = viewport.height - element.top + buffer;
  return `${offsetNeeded}px`;
};

// ============================================================================
// POSITIONING HELPERS (SIMPLIFIED)
// ============================================================================

/**
 * Position element below another element
 */
export const positionBelow = (
  measurements: Map<string, DOMRect>,
  referenceSelector: string,
  targetSelector: string,
  gap: number = 0
): string => {
  const reference = getMeasurement(measurements, referenceSelector);
  const target = getMeasurement(measurements, targetSelector);

  if (!reference || !target) return '0px';

  const desiredTop = reference.bottom + gap;
  const offsetNeeded = desiredTop - target.top;

  return `${offsetNeeded}px`;
};

/**
 * Position element above another element
 */
export const positionAbove = (
  measurements: Map<string, DOMRect>,
  referenceSelector: string,
  targetSelector: string,
  gap: number = 0
): string => {
  const reference = getMeasurement(measurements, referenceSelector);
  const target = getMeasurement(measurements, targetSelector);

  if (!reference || !target) return '0px';

  const desiredBottom = reference.top - gap;
  const desiredTop = desiredBottom - target.height;
  const offsetNeeded = desiredTop - target.top;

  return `${offsetNeeded}px`;
};

/**
 * Position element to the right of another
 */
export const positionRightOf = (
  measurements: Map<string, DOMRect>,
  referenceSelector: string,
  targetSelector: string,
  gap: number = 0
): string => {
  const reference = getMeasurement(measurements, referenceSelector);
  const target = getMeasurement(measurements, targetSelector);

  if (!reference || !target) {
    return '0px';
  }

  const desiredLeft = reference.right + gap;
  const offsetNeeded = desiredLeft - target.left;
  return `${offsetNeeded}px`;
};

/**
 * Position element to the left of another
 */
export const positionLeftOf = (
  measurements: Map<string, DOMRect>,
  referenceSelector: string,
  targetSelector: string,
  gap: number = 0
): string => {
  const reference = getMeasurement(measurements, referenceSelector);
  const target = getMeasurement(measurements, targetSelector);

  if (!reference || !target) return '0px';

  const desiredRight = reference.left - gap;
  const desiredLeft = desiredRight - target.width;
  const offsetNeeded = desiredLeft - target.left;

  return `${offsetNeeded}px`;
};

// ============================================================================
// RESPONSIVE HELPERS
// ============================================================================

/**
 * Get responsive value based on viewport width
 */
export const getResponsiveValue = <T>(
  measurements: Map<string, DOMRect>,
  values: { mobile: T; tablet: T; desktop: T },
  breakpoints = { mobile: 768, tablet: 1024 }
): T => {
  const viewport = getViewport(measurements);

  if (viewport.width < breakpoints.mobile) return values.mobile;
  if (viewport.width < breakpoints.tablet) return values.tablet;
  return values.desktop;
};

// ============================================================================
// QUICK DEBUG HELPER
// ============================================================================

/**
 * Quick debug info for an element
 */
export const debugElement = (
  measurements: Map<string, DOMRect>,
  selector: string
): void => {
  const element = getMeasurement(measurements, selector);
  const viewport = getViewport(measurements);

  if (!element) {
    console.log(`❌ Element '${selector}' not found`);
    return;
  }

  console.log(`📐 ${selector}:`, {
    position: { top: element.top, left: element.left },
    size: { width: element.width, height: element.height },
    safeMovement: {
      up: getSafeMovement(measurements, selector, 'up'),
      down: getSafeMovement(measurements, selector, 'down'),
      left: getSafeMovement(measurements, selector, 'left'),
      right: getSafeMovement(measurements, selector, 'right'),
    },
  });
};

/**
 * Debug positioning relationship between two elements
 */
export const debugPositioning = (
  measurements: Map<string, DOMRect>,
  referenceSelector: string,
  targetSelector: string
): void => {
  const reference = getMeasurement(measurements, referenceSelector);
  const target = getMeasurement(measurements, targetSelector);
  const viewport = getViewport(measurements);

  console.log(
    `🔍 DEBUG POSITIONING: ${targetSelector} relative to ${referenceSelector}`
  );

  if (!reference) {
    console.log(`❌ Reference '${referenceSelector}' not found`);
    return;
  }

  if (!target) {
    console.log(`❌ Target '${targetSelector}' not found`);
    return;
  }

  console.log(`📊 Current state:`, {
    viewport: { width: viewport.width, height: viewport.height },
    reference: {
      selector: referenceSelector,
      bounds: {
        left: reference.left,
        right: reference.right,
        top: reference.top,
        bottom: reference.bottom,
      },
      size: { width: reference.width, height: reference.height },
    },
    target: {
      selector: targetSelector,
      bounds: {
        left: target.left,
        right: target.right,
        top: target.top,
        bottom: target.bottom,
      },
      size: { width: target.width, height: target.height },
    },
    relationships: {
      targetIsRightOfReference: target.left >= reference.right,
      targetIsLeftOfReference: target.right <= reference.left,
      targetIsBelowReference: target.top >= reference.bottom,
      targetIsAboveReference: target.bottom <= reference.top,
      horizontalGap: target.left - reference.right,
      verticalGap: target.top - reference.bottom,
    },
  });

  // Show what each positioning function would return
  console.log(`🧮 Positioning function results:`, {
    positionRightOf: positionRightOf(
      measurements,
      referenceSelector,
      targetSelector,
      0
    ),
    positionRightOfWith20Gap: positionRightOf(
      measurements,
      referenceSelector,
      targetSelector,
      20
    ),
    positionLeftOf: positionLeftOf(
      measurements,
      referenceSelector,
      targetSelector,
      0
    ),
    positionBelow: positionBelow(
      measurements,
      referenceSelector,
      targetSelector,
      0
    ),
    positionAbove: positionAbove(
      measurements,
      referenceSelector,
      targetSelector,
      0
    ),
  });
};

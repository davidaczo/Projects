import { useMemo } from 'react'
import { curveBasis, line } from 'd3-shape'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SCREEN_WIDTH } from '../constants/theme'
import { parse } from 'react-native-redash'

const NUM_TABS = 3;
const SCALE = 0.65;
const TAB_BAR_HEIGHT = 54;

const generateTabShapePath = (
  position,
  adjustedHeight,
) => {
  const adjustedWidth = SCREEN_WIDTH / NUM_TABS;
  const tabX = adjustedWidth * position;
  const lineGenerator = line().curve(curveBasis);
  const tab = lineGenerator([
    [tabX - 100 * SCALE, 0],
    [tabX - (100) * SCALE, 0],
    [tabX - (50) * SCALE, -6 * SCALE],
    [tabX - (35) * SCALE, (adjustedHeight - 5) * SCALE],
    [tabX + (35) * SCALE, (adjustedHeight - 5) * SCALE],
    [tabX + (50) * SCALE, -6 * SCALE],
    [tabX + (100) * SCALE, 0],
    [tabX + 100 * SCALE, 0],
  ]);

  return `${tab}`;
};

const usePath = () => {
  const insets = useSafeAreaInsets();
  const tHeight = TAB_BAR_HEIGHT + insets.bottom;
  const adjustedHeight = tHeight - insets.bottom;

  const containerPath = useMemo(() => {
    const topRightRadius = 0;
    const borderWidth = 0; // Adjust the border width as needed
    const path = `
      M0,${topRightRadius + borderWidth}
      Q0,${borderWidth} ${topRightRadius + borderWidth},${borderWidth}
      L${SCREEN_WIDTH - borderWidth},${borderWidth}
      L${SCREEN_WIDTH},${topRightRadius + borderWidth}
      L${SCREEN_WIDTH},${tHeight}
      L0,${tHeight}
      L0,${topRightRadius + borderWidth}
    `;
    return path.replace(/\s+/g, ' ').trim();
  }, [tHeight]);

  const shadowStyle = {
  };
  const borderPath = useMemo(() => {
    const topRightRadius = 0;
    const borderWidth = 8;
    const path = `
      M0,0
      L${SCREEN_WIDTH},0
      L${SCREEN_WIDTH},${borderWidth}
      L${topRightRadius + borderWidth},${borderWidth}
      Q${borderWidth},${borderWidth} 0,${topRightRadius + borderWidth}
    `;
    return path.replace(/\s+/g, ' ').trim();
  }, []);


  const curvedPaths = useMemo(() => {
    return Array.from({ length: NUM_TABS }, (_, index) => {
      const tabShapePath = generateTabShapePath(index + 0.5, adjustedHeight);
      return parse(`${tabShapePath}`);
    });
  }, [adjustedHeight]);

  return { containerPath, shadowStyle, borderPath, curvedPaths, tHeight };
};

export default usePath;
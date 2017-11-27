export const stripPx = cssSize => parseInt(cssSize.substring(0, cssSize.length - 2), 10)
export const hexToInt = cssHex => parseInt(cssHex.substring(1), 16)
export const parseFontType = cssFont => cssFont.substring(1, cssFont.length - 1)

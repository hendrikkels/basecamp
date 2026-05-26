import type * as CSS from "csstype";

export interface CSSProps {
  _alignContent?: CSS.Property.AlignContent;
  _alignItems?: CSS.Property.AlignItems;
  _alignSelf?: CSS.Property.AlignSelf;
  _aspectRatio?: CSS.Property.AspectRatio;
  _background?: CSS.Property.Background;
  _backgroundColor?: CSS.Property.BackgroundColor;
  _backgroundImage?: CSS.Property.BackgroundImage;
  _backgroundPosition?: CSS.Property.BackgroundPosition;
  _backgroundRepeat?: CSS.Property.BackgroundRepeat;
  _backgroundSize?: CSS.Property.BackgroundSize;
  _border?: CSS.Property.Border;
  _borderBottom?: CSS.Property.BorderBottom;
  _borderBottomLeftRadius?: CSS.Property.BorderBottomLeftRadius;
  _borderBottomRightRadius?: CSS.Property.BorderBottomRightRadius;
  _borderColor?: CSS.Property.BorderColor;
  _borderLeft?: CSS.Property.BorderLeft;
  _borderRadius?: CSS.Property.BorderRadius;
  _borderRight?: CSS.Property.BorderRight;
  _borderStyle?: CSS.Property.BorderStyle;
  _borderTop?: CSS.Property.BorderTop;
  _borderTopLeftRadius?: CSS.Property.BorderTopLeftRadius;
  _borderTopRightRadius?: CSS.Property.BorderTopRightRadius;
  _borderWidth?: CSS.Property.BorderWidth;
  _bottom?: CSS.Property.Bottom;
  _boxShadow?: CSS.Property.BoxShadow;
  _boxSizing?: CSS.Property.BoxSizing;
  _color?: CSS.Property.Color;
  _columnGap?: CSS.Property.ColumnGap;
  _cursor?: CSS.Property.Cursor;
  _display?: CSS.Property.Display;
  _flex?: CSS.Property.Flex;
  _flexBasis?: CSS.Property.FlexBasis;
  _flexDirection?: CSS.Property.FlexDirection;
  _flexGrow?: CSS.Property.FlexGrow;
  _flexShrink?: CSS.Property.FlexShrink;
  _flexWrap?: CSS.Property.FlexWrap;
  _fontFamily?: CSS.Property.FontFamily;
  _fontSize?: CSS.Property.FontSize;
  _fontStyle?: CSS.Property.FontStyle;
  _fontWeight?: CSS.Property.FontWeight;
  _gap?: CSS.Property.Gap;
  _gridAutoColumns?: CSS.Property.GridAutoColumns;
  _gridAutoFlow?: CSS.Property.GridAutoFlow;
  _gridAutoRows?: CSS.Property.GridAutoRows;
  _gridArea?: CSS.Property.GridArea;
  _gridColumn?: CSS.Property.GridColumn;
  _gridColumnEnd?: CSS.Property.GridColumnEnd;
  _gridColumnStart?: CSS.Property.GridColumnStart;
  _gridRow?: CSS.Property.GridRow;
  _gridRowEnd?: CSS.Property.GridRowEnd;
  _gridRowStart?: CSS.Property.GridRowStart;
  _gridTemplateAreas?: CSS.Property.GridTemplateAreas;
  _gridTemplateColumns?: CSS.Property.GridTemplateColumns;
  _gridTemplateRows?: CSS.Property.GridTemplateRows;
  _height?: CSS.Property.Height;
  _inset?: CSS.Property.Inset;
  _justifyContent?: CSS.Property.JustifyContent;
  _justifyItems?: CSS.Property.JustifyItems;
  _justifySelf?: CSS.Property.JustifySelf;
  _left?: CSS.Property.Left;
  _letterSpacing?: CSS.Property.LetterSpacing;
  _lineHeight?: CSS.Property.LineHeight;
  _listStyle?: CSS.Property.ListStyle;
  _margin?: CSS.Property.Margin;
  _marginBottom?: CSS.Property.MarginBottom;
  _marginLeft?: CSS.Property.MarginLeft;
  _marginRight?: CSS.Property.MarginRight;
  _marginTop?: CSS.Property.MarginTop;
  _maxHeight?: CSS.Property.MaxHeight;
  _maxWidth?: CSS.Property.MaxWidth;
  _minHeight?: CSS.Property.MinHeight;
  _minWidth?: CSS.Property.MinWidth;
  _objectFit?: CSS.Property.ObjectFit;
  _objectPosition?: CSS.Property.ObjectPosition;
  _opacity?: CSS.Property.Opacity;
  _order?: CSS.Property.Order;
  _outline?: CSS.Property.Outline;
  _overflow?: CSS.Property.Overflow;
  _overflowX?: CSS.Property.OverflowX;
  _overflowY?: CSS.Property.OverflowY;
  _padding?: CSS.Property.Padding;
  _paddingBottom?: CSS.Property.PaddingBottom;
  _paddingLeft?: CSS.Property.PaddingLeft;
  _paddingRight?: CSS.Property.PaddingRight;
  _paddingTop?: CSS.Property.PaddingTop;
  _placeContent?: CSS.Property.PlaceContent;
  _placeItems?: CSS.Property.PlaceItems;
  _placeSelf?: CSS.Property.PlaceSelf;
  _pointerEvents?: CSS.Property.PointerEvents;
  _position?: CSS.Property.Position;
  _resize?: CSS.Property.Resize;
  _right?: CSS.Property.Right;
  _rowGap?: CSS.Property.RowGap;
  _textAlign?: CSS.Property.TextAlign;
  _textDecoration?: CSS.Property.TextDecoration;
  _textOverflow?: CSS.Property.TextOverflow;
  _textTransform?: CSS.Property.TextTransform;
  _top?: CSS.Property.Top;
  _transform?: CSS.Property.Transform;
  _transition?: CSS.Property.Transition;
  _userSelect?: CSS.Property.UserSelect;
  _verticalAlign?: CSS.Property.VerticalAlign;
  _visibility?: CSS.Property.Visibility;
  _whiteSpace?: CSS.Property.WhiteSpace;
  _width?: CSS.Property.Width;
  _wordBreak?: CSS.Property.WordBreak;
  _wordWrap?: CSS.Property.WordWrap;
  _zIndex?: CSS.Property.ZIndex;
}

export const CSS_PROP_KEYS: (keyof CSSProps)[] = [
  "_alignContent",
  "_alignItems",
  "_alignSelf",
  "_aspectRatio",
  "_background",
  "_backgroundColor",
  "_backgroundImage",
  "_backgroundPosition",
  "_backgroundRepeat",
  "_backgroundSize",
  "_border",
  "_borderBottom",
  "_borderBottomLeftRadius",
  "_borderBottomRightRadius",
  "_borderColor",
  "_borderLeft",
  "_borderRadius",
  "_borderRight",
  "_borderStyle",
  "_borderTop",
  "_borderTopLeftRadius",
  "_borderTopRightRadius",
  "_borderWidth",
  "_bottom",
  "_boxShadow",
  "_boxSizing",
  "_color",
  "_columnGap",
  "_cursor",
  "_display",
  "_flex",
  "_flexBasis",
  "_flexDirection",
  "_flexGrow",
  "_flexShrink",
  "_flexWrap",
  "_fontFamily",
  "_fontSize",
  "_fontStyle",
  "_fontWeight",
  "_gap",
  "_gridAutoColumns",
  "_gridAutoFlow",
  "_gridAutoRows",
  "_gridArea",
  "_gridColumn",
  "_gridColumnEnd",
  "_gridColumnStart",
  "_gridRow",
  "_gridRowEnd",
  "_gridRowStart",
  "_gridTemplateAreas",
  "_gridTemplateColumns",
  "_gridTemplateRows",
  "_height",
  "_inset",
  "_justifyContent",
  "_justifyItems",
  "_justifySelf",
  "_left",
  "_letterSpacing",
  "_lineHeight",
  "_listStyle",
  "_margin",
  "_marginBottom",
  "_marginLeft",
  "_marginRight",
  "_marginTop",
  "_maxHeight",
  "_maxWidth",
  "_minHeight",
  "_minWidth",
  "_objectFit",
  "_objectPosition",
  "_opacity",
  "_order",
  "_outline",
  "_overflow",
  "_overflowX",
  "_overflowY",
  "_padding",
  "_paddingBottom",
  "_paddingLeft",
  "_paddingRight",
  "_paddingTop",
  "_placeContent",
  "_placeItems",
  "_placeSelf",
  "_pointerEvents",
  "_position",
  "_resize",
  "_right",
  "_rowGap",
  "_textAlign",
  "_textDecoration",
  "_textOverflow",
  "_textTransform",
  "_top",
  "_transform",
  "_transition",
  "_userSelect",
  "_verticalAlign",
  "_visibility",
  "_whiteSpace",
  "_width",
  "_wordBreak",
  "_wordWrap",
  "_zIndex",
];

import React, { useState } from 'react'
import { ScrollView, ScrollViewProps } from 'react-native'

import { sharedStyles } from '../../styles/shared'

export interface FullHeightScrollViewProps extends ScrollViewProps {
  children: React.ReactNode
}

export const FullHeightScrollView = React.memo(
  (props: FullHeightScrollViewProps) => {
    const {
      children,
      contentContainerStyle,
      onContentSizeChange,
      onLayout,
      style,
      ...otherProps
    } = props

    const [containerHeight, setContainerHeight] = useState(0)
    const [contentHeight, setContentHeight] = useState(containerHeight)

    return (
      <ScrollView
        {...otherProps}
        onContentSizeChange={(w, h) => {
          if (onContentSizeChange) onContentSizeChange(w, h)
          if (h !== contentHeight) setContentHeight(h)
        }}
        onLayout={e => {
          if (onLayout) onLayout(e)
          if (e.nativeEvent.layout.height !== containerHeight)
            setContainerHeight(e.nativeEvent.layout.height)
        }}
        contentContainerStyle={[
          contentHeight > 0 &&
          containerHeight > 0 &&
          contentHeight >= containerHeight
            ? { minHeight: containerHeight }
            : sharedStyles.flexGrow,

          contentContainerStyle,
        ]}
        style={[sharedStyles.fullHeight, style]}
      >
        {children}
      </ScrollView>
    )
  },
)

FullHeightScrollView.displayName = 'FullHeightScrollView'

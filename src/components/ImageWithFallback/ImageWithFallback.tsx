import React from 'react'

const FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'><rect fill='%23eee' width='100%' height='100%'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='20'>No image</text></svg>"

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

const ImageWithFallback: React.FC<Props> = ({ src, alt, ...rest }) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const t = e.currentTarget
    if (t.src === FALLBACK) return
    t.src = FALLBACK
  }

  return <img src={src || FALLBACK} alt={alt} onError={handleError} {...rest} />
}

export default ImageWithFallback

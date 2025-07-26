import { useState } from 'react'

const Image = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  placeholder,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && placeholder && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        {...props}
      />
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">Error al cargar imagen</span>
        </div>
      )}
    </div>
  )
}

export default Image
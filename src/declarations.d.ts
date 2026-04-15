// Allow importing SVG files as URLs (strings)
declare module '*.svg' {
  const src: string;
  export default src;
}

// Allow importing PNG/JPG/WebP files as URLs
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

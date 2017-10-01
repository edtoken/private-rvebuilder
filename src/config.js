export const __IS_CLIENT__ = () => (typeof window !== 'undefined' || typeof document !== 'undefined')

export const __NODE_ENV__ = process.env.__NODE_ENV__ // development || production
export const __PACKAGE_VERSION__ = process.env.__PACKAGE_VERSION__
export const __IS_DEVELOPMENT__ = process.env.__IS_DEVELOPMENT__

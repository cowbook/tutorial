import { getContentRoutes } from './content-routes.mjs'

export const contentRoutes = getContentRoutes()
export const publicRoutes = ['/', ...contentRoutes, '/en/home/']

import { hc } from 'hono/client'
// import { type ApiRoutes } from '../../../backend/src/index'
import { type ApiRoutes } from "../../../backend/src/index"

const client = hc<ApiRoutes>('/');

export const api = client.api;
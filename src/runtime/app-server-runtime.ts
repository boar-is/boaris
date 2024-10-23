import { ManagedRuntime } from 'effect'
import { AppRpcRouterMock } from '~/service/app-rpc-router-mock'

export const AppServerRuntime = ManagedRuntime.make(AppRpcRouterMock)

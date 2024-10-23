import { Layer, ManagedRuntime } from 'effect'
import { AppRpcClient } from '~/services/app-rpc-client'
import { AppRpcRouterMock } from '~/services/app-rpc-router-mock'

export const AppServerRuntime = ManagedRuntime.make(
  AppRpcClient.Default.pipe(Layer.provide(AppRpcRouterMock)),
)

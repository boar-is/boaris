import { Layer, ManagedRuntime } from 'effect'
import { AppRpcClient } from '~/service/app-rpc-client'
import { AppRpcRouterMock } from '~/service/app-rpc-router-mock'

export const AppServerRuntime = ManagedRuntime.make(
  AppRpcClient.Default.pipe(Layer.provide(AppRpcRouterMock)),
)

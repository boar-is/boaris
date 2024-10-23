import { RpcResolver, RpcRouter } from '@effect/rpc'
import { Effect } from 'effect'
import { AppRpcRouter } from '~/services/app-rpc-router'

export class AppRpcClient extends Effect.Service<AppRpcClient>()(
  'AppRpcClient',
  {
    effect: Effect.gen(function* () {
      const router = yield* AppRpcRouter

      const handler = RpcRouter.toHandler(router)
      const resolver = RpcResolver.make(handler)<typeof router>()

      return RpcResolver.toClient(resolver)
    }),
  },
) {}

import { workspace } from '~/model/workspace'

export default async function SitePage() {
  return <div>{workspace.name}</div>
}

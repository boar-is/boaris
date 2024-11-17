import { workspace } from '~/data/workspace'

export default async function SitePage() {
  return <div>{workspace.name}</div>
}

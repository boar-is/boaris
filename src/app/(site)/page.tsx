import { workspace } from '~/model2/workspace'

export default async function SitePage() {
  return <div>{workspace.name}</div>
}

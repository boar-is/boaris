import { workspace } from '~/model/workspace'

export default async function SitePage() {
  return <div className="container">{workspace.name}</div>
}

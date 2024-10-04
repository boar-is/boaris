export type WorkspaceProjectPostPageData = {
  readonly post: {
    readonly title: string
  }
}

export const queryWorkspaceProjectPostPageData = async (
  workspaceSlug: string,
  projectSlug: string,
  postSlug: string,
) => {}

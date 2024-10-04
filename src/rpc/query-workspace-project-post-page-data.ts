export type WorkspaceProjectPostPageData = {
  readonly post: {
    readonly title: string
  }
}

export const queryWorkspaceProjectPostPageData = async ({
  workspaceSlug,
  projectSlug,
  postSlug,
}: {
  readonly workspaceSlug: string
  readonly projectSlug: string
  readonly postSlug: string
}): Promise<WorkspaceProjectPostPageData | null> => {
  return {
    post: {
      title: `${workspaceSlug}/${projectSlug}/${postSlug}`,
    },
  }
}

# Keep the GitHub profile separate from the company website

- Status: Accepted
- Date: 2026-10-22

## Context

The organization needs a public GitHub introduction and shared contribution
files. GitHub requires this `.github` repository to be public for default community
health files to apply across the organization. The company website already has a
separate private source repository and deployment workflow.

## Decision

Keep `.github` public and limited to GitHub profile content, contribution defaults,
and their documentation. Publish a concise `profile/README.md` that links to
`https://latentmethods.com`. Keep website source and deployment in the existing
private website repository.

## Alternatives and tradeoffs

Combining website source with `.github` would reduce repository count, but would
expose website source and couple website deployments to organization defaults.
Keeping them separate preserves independent access and deployment, at the cost
of keeping a small amount of public profile copy aligned with the live website.
The website remains the primary source of company and product information.

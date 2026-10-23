# Latent Methods GitHub defaults

Public organization profile and shared contribution templates for Latent Methods.

## Organization profile

[The organization profile](profile/README.md) introduces Latent Methods and links
to the company website at [latentmethods.com](https://latentmethods.com). GitHub
displays it on the organization overview after it reaches this repository's
default branch.

Keep the profile concise and aligned with the public website. The website source
and deployment remain in their separate private repository; this repository holds
only public GitHub content. See the [repository separation decision](docs/decisions/001-public-github-presence.md).

## Pull request template

[The default template](.github/pull_request_template.md) uses four short sections:

- **Summary:** the problem, resulting behavior, and relevant context.
- **Changes:** the main changes and meaningful tradeoffs; optional for small PRs.
- **Verification:** checks actually performed, results, and known gaps.
- **Risks and rollout:** material impact, rollout or rollback steps, and review focus.

Keep descriptions proportional to the change. The HTML comments guide authors
and agents without appearing in the rendered PR. Repository-specific contribution,
review, and release requirements still apply.

## How inheritance works

GitHub uses this template for repositories in the organization that do not define
their own PR template. This repository must remain public, and the template must
remain on its default branch. A repository-local template takes precedence.
Existing PR descriptions are not updated.

When a CLI, API, or agent creates a PR with an explicit body, it should use this
template's structure itself; GitHub does not rewrite supplied descriptions.
Fetch the current template rather than maintaining a second copy:

```sh
gh api repos/latentmethods/.github/contents/.github/pull_request_template.md \
  --jq .content | base64 --decode > /tmp/latentmethods-pr-body.md
```

Fill in that file, then pass it to `gh pr create --body-file` with the repository's
appropriate base and head branches.

See GitHub's documentation on [default community health files](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file)
and [pull request templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository).

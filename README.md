## Navigation

- [Usage](#usage)
- [Options](#options)
- [Outputs](#outputs)
- [Contrubuting](#contributing)
- [Maintenance](#maintenance)
  - [Regular flow](#regular-flow)
  - [Conventions](#conventions)

## Usage

Check branch existence:

```yml
steps:
  - uses: actions/checkout@v3

  - id: branch
    uses: release-kit/branch@v1
    with:
      branch: 'release'
      action: 'check-existence'

  - run: echo "${{ steps.branch.output.exists }}"
```

Checkout branch or create when not exists:

```yml
steps:
  - uses: actions/checkout@v3

  - id: branch
    uses: release-kit/branch@v1
    with:
      branch: 'release'
      action: 'checkout-or-create'
```

## Options

- `branch` - a git branch name
- `action` - an action to perform with branch
  - `check-existence`
  - `checkout-or-create`

## Outputs

- `exists` - branch existence

## Contributing

1. Fork this repo
2. Use the [Regular flow](#regular-flow)

Please follow [Conventions](#conventions)

## Maintenance

The dev branch is `main` - any developer changes is merged in there.

All changes is made using Pull Requests - push is forbidden. PR can be merged only after successfull `test-and-build` workflow checks.

When PR is merged, `release-drafter` workflow creates/updates a draft release. The changelog is built from the merged branch scope (`feat`, `fix`, etc) and PR title. When release is ready - we publish the draft.

Then, the `update-major-tag` workflow sets an additional tag for your major version, so your action can be used like `scope/action@v1` instead of explicitly specifying `v1.0.0` version.

### Regular flow

1. Create [feature branch](#conventions)
2. Make changes in your feature branch and [commit](#conventions)  
   You may omit running `build` script, since the pre-commit hook does it automatically
3. Create a Pull Request from your feature branch to `main`  
   The PR is needed to test the code before pushing to release branch
4. If your PR contains breaking changes, don't forget to put a `BREAKING CHANGES` label
5. Merge the PR in `main`
6. All done! Now you have a drafted release - just publish it when ready

### Conventions

**Feature branches**:
- Should start with `feat/`, `fix/`, `docs/`, `refactor/`, and etc., depending on the changes you want to propose (see [pr-labeler.yml](./.github/pr-labeler.yml) for a full list of scopes)

**Commits**:
- Should follow the [Conventional Commits specification](https://www.conventionalcommits.org)

**Pull requests**:
- Should have human-readable name, for example: "Add a TODO list feature"
- Should describe changes
- Should have correct labels
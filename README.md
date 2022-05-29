## Navigation

- [Usage](#usage)
- [Options](#options)
- [Outputs](#outputs)
- [Contrubuting](#contributing)
- [Maintenance](#maintenance)
  - [Regular flow](#regular-flow)
  - [Conventions](#conventions)
- [Using template](#using-template)
  - [Replace everything](#replace-everything)
  - [Add secrets](#add-secrets)
  - [Set up branch protection](#set-up-branch-protection)
  - [The last step](#the-last-step)

## Usage

Add A to B:

```yml
steps:
  - name: Sum up
    id: sum
    uses: your-scope/github-action@v1
    with:
      a: 2
      b: 2
```

Use result:

```yml
- name: Echo sum
  run: echo "${{ steps.sum.outputs.result }}"
```

## Options

- `a` - first number
- `b` - second number

## Outputs

- `result` - sum of A and B

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

## Using template

### Replace everything

1. Replace all `your-scope/github-action` entries with your full action name
2. Replace all `github-action` entries with your action name
3. Replace all `Github Action Description` entries with your action description
4. Replace all `Your Name` entries with your name

### Add secrets

- `FULL_ACCESS_GITHUB_TOKEN` if you plan to set up [the branch protection](#add-branch-protection)

### Set up branch protection

1. Go to `Settings` > `Branches` > `Add rule`
2. Specify `main` branch
3. Enable the following options:
   - Require a pull request before merging (without approvals)
   - Require status checks to pass before merging (you need to run them at least once to appear):
     - `test-and-build`
     - `pr-labeler`
   - Include administrators
   - Allow force pushes
4. [Create a new Personal Access Token](https://github.com/settings/tokens/new) with `repo` permissions
5. Use it as a new Secret named `FULL_ACCESS_GITHUB_TOKEN`  
   It's needed to bypass the branch protection on CI runs

### The last step

Remove **Using Template** section from README (don't forget about Navigation links)

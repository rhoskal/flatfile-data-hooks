# Notes

- "Show Variables" btn doesn't show the data type to help avoid undefine's
- Why are "Test Result" fields editable??
- Should have popup indicating code was copied to clipboard when user clicks copy code button (customers have said this)
- Deploying reloads the page and causes my position in my code to reset back to defaults
  - Deploying a new version of my Hooks deletes all my test data -- remove pre-loaded test data

# Data Hooks Feedback

- Is there a way to run these cloud functions locally? It would speed up dev time.
- Allow ES6 modules?
- Allow Typescript? Code safety, some pkgs depend on it, most of industry is using it
- Can we expose types in a package? I don't know the structure of "record", recordBatch, session, logger, etc.
  - Gives more feeback about error states
- Node v14 upgrade to LTS?
  - Docs should specify which version our Data Hooks are running in.
  - Expose more information about code environment (Node version, etc.)
  - Give customers a choice of which Node version to use?
- Create a "pre-hook" that is guaranteed to run only once?
  - E.g. allow developer to peform network request to their API and get a token, then store this for all DH's to access
- What if we had a GitHub repo with examples? Easy to keep up to date and easy to show variations of a theme. e.g. 1 date vs multiple dates
- SDK should publish both UMD & ES Module variants. ESM allow for tree shaking
- What delimeteres are allowed in CSV parsing? Are they in the docs?
  - By default we work well with: , , | , / , \ , ; , and tab.
- All available import file encodings should be in the docs
- Max file sizes for both csv and excel should be in the docs
- Unify docs (where appropriate) w/ Customer Success

# Maybes

- Access to private NPM packages? Allow npmrc to be uploaded?
- Create "API clients" to provide high level functions for REST calls
- Create an "FlatFile/utils" OSS npm package for customers to use?

# In the works

- Better "missing dependency" warning (logs feature)
- A lot of scrolling up and down when writing Hooks. Code window with is really small. Also, maybe collapse left nav menu.

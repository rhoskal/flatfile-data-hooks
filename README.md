# Notes

- "Show Variables" btn doesn't show which fields are required or not telling devs if a field will be undefined
- "Test your DataHook" -> why do I have to hand-jam in data instead of using realistic data?
  - Fields show indicate which fields are required (using an \*)
  - Why are "Test Result" fields editable??
- Should have popup indicating code was copied to clipboard when user clicks copy code button
- Why do I have re-deploy just to test changes?
- Is there a way to run these cloud functions locally? It would speed up dev time.

# Data Hooks Feedback

- Deploying reloads the page and causes my position in my code to reset back to defaults
- Deploying a new version of my Hooks deletes all my test data
- No warning when leaving un-saved changes
- Allow ES6 modules?
- Node v14 upgrade to LTS?
  - Docs should specify which version our Data Hooks are running in.
  - Node v14 has different behavior w/ string.replace :(
- SDK README.md should specify minimum Node version
- Create a "pre-hook" that is guaranteed to run only once?
  - E.g. allow developer to peform network request to their API and get a token, then store this for all DH's to access
- Access to private NPM packages? Allow npmrc to be uploaded?
- Create "API clients" to provide high level functions for REST calls
- Expose more information about code environment (Node version, etc.)
- Can we expose types in a package? I don't know the structure of "record", recordBatch, session, logger, etc.
  - Gives more feeback about error states
- Can we enable Typescript?
- Create an "FlatFile/utils" OSS npm package for customers to use?
- What if we had a GitHub repo with examples? Easy to keep up to date and easy to show variations of a theme. e.g. 1 date vs multiple dates
- Better "missing dependency" warning
- A lot of scrolling up and down when writing Hooks. Code window with is really small. Also, maybe collapse left nav menu.
- SDK should publush both UMD & ES Module variants. ESM allow for tree shaking
- What delimeteres are allowed in CSV parsing? Are they in the docs?
  - By default we work well with: , , | , / , \ , ; , and tab.

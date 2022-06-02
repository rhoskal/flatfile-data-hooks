# FAQs

- Q. What is configurable in Embeds in terms of branding?
  A. Primary color and font family

- Q. If large files are broken up into smaller pieces, what exactly does that look like?
  A. Large files are "sliced" into smaller pieces (5MB) to help with large file uploads. Furthermore,
  both in the UI and AWS processing, large files are broken up into chunks of 1K records.

- Q. If I have a network request in a v3 Data Hook, will it execute for /every/ record? E.g. If we have
  1M records, will we have 1M network requests?
  A. No. As long as the network req isn't inside the `recordBatch.records.map/forEach` block, then
  you would have ==> 1M records / 1K batchSize = 1K network requests

- Q. With Embeds, how long is the JWT valid for in Flatfile?
  A. Flatfile is not part of the JWT creation so it's up to the customer to add an expiration date.
  Our SDK will check and should error out if an expired JWT is passed in.

- Q. If multiple customers upload large files within seconds of each other, will Flatfile performance
  be degraded in any way?
  A. Resources are pooled and our infrastructure automatically autoscales based on demand so it's unlikely
  they will noticed any degraded performance.

- Q. Excel exports "formatted" values by default -- not the "raw" -- values. How do we get around this?
  A.
  [FLA-570]
  "We [Flatfile] decided that the way people look at the data in excel is right. I think there’s potentially a window for us to provide both here though."
  "Looks like the biggest ask is to get the raw time stamp from excel where possible."
  [FLA-1268]
  Loss of precision with scientific numbers b/c excel export is formatted string

- Q.
  A.

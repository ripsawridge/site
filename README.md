site
====


My personal web site, at https://www.mountainwerks.org.

Devoted to mountain climbing, with just a bit of blogging and computer stuff
about me. The site is statically generated with python.

Deployed by wercker. A custom build step was created to upload to host, it
is [https://github.com/ripsawridge/rsync-no-delete](https://github.com/ripsawridge/rsync-no-delete).
It is referenced in `wercker.yml` and mentioned on their site [here](https://app.wercker.com/steps/ripsawridge/rsync-no-delete).

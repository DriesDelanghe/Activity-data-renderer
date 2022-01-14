# Data renderer v2.0
---
this data renderer contains some cool new features !  
it also includes an updated CLI UI, now using select list for ease of use

### How to run
---
if you run this for the first time:
1. `npm run build`
2. `npm run start`

if you have already build the project you only need to run `npm run start`

**Note: These commands are run from the CLI**

### Updates
---
##### Data is now more customizable
More fields of an activity object can now be customized to more fit your needs
- The max length of a scope object can now be set (the length will still be a random length but won't be longer than the max length)
- The timestamp of the activities can now be set, options are:
    - Past hour
    - Past day
    - Past week
    - Past month
    - Past year
- The amount of objects to be rendered can be set

##### Now includes customisable fileWriter
you can now chose where to write the file to.  
if directory and/or file doesn't exist yet, it will create it

*warning: when selecting the from system root option for filepath, make sure your filepath is correct*

##### Now includes the option to post to an endpoint
you can now chose to have this tool post the data to an endpoint.  
the default endpoint only exists on my local repo of the activity-logger, so either implement this method or ask me to push this to the dev branch
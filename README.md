# Leave Kudos!

## Setup

    git clone git@github.com:johnkpaul/leavekudos.git
    cd leavekudos
    bundle
    rake db:schema:load
    rake db:migrate
    rails s

## Testing

Run the tests before you commit pls.

    rake db:test:prepare
    rspec spec


## Deploy

    git remote add staging git@heroku.com:leavekudos-staging.git
    git remote add prod git@heroku.com:leavekudos.git

### Staging

    git push staging master

### Production

    git push prod master

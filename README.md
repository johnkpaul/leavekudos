# Leave Kudos

Leave Kudos lets you leave feedback for the employees who help you at various venues. Have good service at a diner? Leave a nice note about the waitress! Did she spit in your coffee? Leave a negative remark.

## Setup

    git clone git@github.com:johnkpaul/leavekudos.git
    cd leavekudos
    bundle
    rake db:schema:load
    rake db:migrate
    rails s


## Testing

Run the tests before you commit, please.

    rake db:test:prepare
    rspec spec


## Deploy

    git remote add staging git@heroku.com:leavekudos-staging.git
    git remote add prod git@heroku.com:leavekudos.git


### Staging

    git push staging master
    heroku run rake db:migrate --app leavekudos-staging


### Production

    git push prod master
    heroku run rake db:migrate --app leavekudos

## API Documentation

The following endpoints are provided by the Leave Kudos API:

### GET /kudos/mostrecent

    {
      "kudos": [ {
        "anecdote": "Ryan was helpful.",
        "created_at": "2013-01-05T16:50:59Z",
        "employee_id": 3,
        "foursquare_user_id": 12,
        "id": 1,
        "updated_at": "2013-01-05T17:07:39Z",
        "venue_id": 123,
        "venue_notified": null,
        "employee": {
          "description": "Ryan is a guy and he wears shirts. Sometimes.",
          "id": 3,
          "name": "Ryan Juang",
          "venue_id": 123
        }
      } ]
    }

### GET /venue/:venue_id/employees

    {
      "employees": [ {
        "description": "Ryan is a guy and he wears shirts. Sometimes.",
        "id": 3,
        "name": "Ryan Juang",
        "venue_id": 123
      }, {
        "description": "John Paul is a really cool guy and doesn't afraid of anything",
        "id": 4,
        "name": "John Paul",
        "venue_id": 123
      }, {
        "description": "Ben is a programmer and he likes things.",
        "id": 5,
        "name": "Ben Burton",
        "venue_id": 123
      } ]
    }


### GET /venue/:venue_id/kudos

    {
      "kudos": [ {
        "anecdote": "Ryan was helpful",
        "created_at": "2013-01-05T16:50:59Z",
        "employee_id": 3,
        "foursquare_user_id": 12,
        "id": 1,
        "updated_at": "2013-01-05T17:07:39Z",
        "venue_id": 123,
        "venue_notified": null
      } ]
    }


### POST /kudos

Use the following format to POST Kudos to the app:

    {
      "kudo": {
        "foursquare_user_id": 123,
        "employee_id": 3,
        "anecdote": "Ryan was helpful."
      }
    }


If your request is invalid for some reason, you'll get a 400 back with error messages in the JSON:

    {
      "errors": [
        "Employee can't be blank",
        "Venue can't be blank"
      ]
    }

You can also provide an employee object in the JSON to generate a new employee object for your kudos:

    {
      "kudo": {
        "foursquare_user_id": 123,
        "anecdote": "Ryan was helpful.",
        "employee": {
          "name": "Ryan Juang",
          "description": "Ryan is a guy and he wears shirts. Sometimes."
        }
      }
    }

### Foursquare API Passthroughs

The following methods pass-through to the Foursquare API:

  * GET /checkins
  * GET /venue
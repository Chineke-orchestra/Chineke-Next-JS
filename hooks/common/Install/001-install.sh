#!/bin/bash -e
 
# Include profile
. /etc/profile
 
application="${1}"
environment="${2}"
domain="${3}"
docroot="/var/www/html/${application}/${environment}"
webroot="${docroot}/web"
 
cd "${webroot}"
 
$(which npm) run build-internal && export PORT=3058
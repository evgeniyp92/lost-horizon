#!/bin/sh

# line endings must be \n, not \r\n !
# echo "window._env_ = {" > ./env-config.js
# awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' ./.env >> ./env-config.js
# echo "}" >> ./env-config.js

# https://github.com/facebook/create-react-app/issues/2353

WWW_DIR=/usr/share/nginx/html
ENV_PREFIX=REACT_APP_
INJECT_FILE_PATH="${WWW_DIR}/env-config.js"

# Clear existing file
truncate -s 0 "${WWW_DIR}/env-config.js"
truncate -s 0 "${WWW_DIR}/.env"

# Create .env file from REACT_APP environment variables
# overwrite existing
env | grep "${ENV_PREFIX}" >> ${WWW_DIR}/.env

echo "window._env_ = {" >> "${INJECT_FILE_PATH}"

while read -r line || [ -n "$line" ];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
    echo "Found :" ${varname} ${varvalue}
    echo "  $varname: \"$varvalue\"," >> "${INJECT_FILE_PATH}"
  fi
done < .env


echo "}" >> "${INJECT_FILE_PATH}"
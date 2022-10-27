#!/bin/bash
set -e

HOST="mountainwerks.org"
DIRECTORY="~/public_html"
USER="mountai8"
SSHKEY="~/.ssh/id_rsa_svn"

# host option
if [ -z "$HOST" ]
then
    fail 'missing host option, please add this the rsync-deploy step in wercker.yml'
fi

# directory option
if [ -z "$DIRECTORY" ]
then
    fail 'missing directory option, please add this the rsync-deploy step in wercker.yml'
fi

# user option
remote_user="ubuntu"
if [ -n "$USER" ]; # Check $WERCKER_BUNDLE_INSTALL exists and is not empty
then
    remote_user="$USER"
fi
echo "using user $remote_user"

# port option
remote_port="22"
if [ -n "$SSHPORT" ]; # Check $WERCKER_RSYNC_DEPLOY_SSHPORT exists and is not empty
then
    remote_port="$SSHPORT"
fi
echo "using remote port $remote_port"

# key option
rsync_command="ssh -o BatchMode=yes -p $remote_port" # Batchmode to prevent it from waiting on user input
if [ -n "$SSHKEY" ]
then
    rsync_command="$rsync_command -i $SSHKEY"
fi

source_dir="./"
if [ -n "$SOURCE" ]; # check if source dir is specified
then
    source_dir=$SOURCE
fi

echo "Synchronizing $source_dir to $remote_user@$HOST:$DIRECTORY..."
sync_output=$(rsync -urltv --rsh="$rsync_command" "$source_dir" "$remote_user@$HOST:$DIRECTORY")
if [[ $? -ne 0 ]];then
    echo $sync_output
    echo 'rsync failed';
else
    echo "finished rsync synchronisation"
fi

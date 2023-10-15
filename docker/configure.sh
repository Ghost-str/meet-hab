#!/bin/bash

mkdir ~/.ssh
cat > ~/.ssh/config << EOF 
Host server
    HostName $1
    User $2
    Port $3
    PubKeyAuthentication yes
    StrictHostKeyChecking no
    IdentityFile ~/.ssh/private_key
EOF

chmod 700 ~/.ssh
chmod 600 ~/.ssh/config
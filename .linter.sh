#!/bin/bash
cd /home/kavia/workspace/code-generation/twintic-112837-924530c4/twin_tic_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


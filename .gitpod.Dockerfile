FROM gitpod/workspace-full

# Set default Node version
RUN bash -c ". .nvm/nvm.sh && nvm install 14.17 && nvm use 14.17 && nvm alias default 14.17"
RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix
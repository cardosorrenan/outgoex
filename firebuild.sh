rm -rf deploy/public
mkdir deploy/public
cp -a dist/* deploy/public
rm -rf dist/
cd deploy
firebase deploy
cd ..

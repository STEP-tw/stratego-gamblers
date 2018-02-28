npm run coverage && nyc check-coverage
TEST_STATUS=$?
if [ $TEST_STATUS -ne 0 ] ; then
echo 'error'
exit 1;
fi

echo 'everything OK'
git push heroku master
exit 0;
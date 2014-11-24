ionic-tabs-test
===============

Ionic Framework / Test (only test !) with tabs

Project initially created from command :

    ionic start myApp tabs

Then the project was modified to use these :

- First tab (**Location**) :
    - Using GPS to obtain location (latitude & longitude)


    TODO:
        - Draw a map with current location
        - Use markers on that map
- Second tab (**Stores**)
    - Using external REST service to get a list of items (stores)


    TODO: 
        - Using a waiting/loading symbol
        - Detect if offline before loading
        - Contact web service once and use caching if going back to the tab

- Third tab (**Accounts**)
    - Using WebSQL to get a list of accounts


    TODO: 
        - Using sqlLite ngCordova extension instead of WebSQL (abandonned but works with Chrome)
        - Possibility to remove/add accounts

# Berlin Transportation App

## Documentation

<b>Berlin Transportation App</b> is a simple application that helps users get more information about public transport in Berlin.
User simply has to search for his area and the stops near this area will be listed with all the transport methods included.
If he wants more information, he should choose the stop for more details:

Details:
<li>Name of the selected stop</li>
<li>An icon that shows if this stop is favorite or not, which is editable</li>
<li>Departures component lists departures for the selected stop that have not occured yet</li>
<li>Arrivals component lists arrivals for the selected stop that have not occured yet</li>
<li>Departures/Arrivals info: line name, direction/provenance, remaining time, transport product, delay</li>
</br>

To have easier access to his favorite stops user can save the stop and all his favorite stops will be displayed in the marked stops in Homepage.</br>
He can remove them from his favorite list at any time.</br></br>

I also worked with <b> Offline Version </b> of the app. I added Angular Service Worker for this.</br>
When user is online in each request I handle te set in local storage all the information. When user is offline in each request I looked if in local storage have corresponding information, if yes return this data, esle throw error 


## Install

    $ git clone https://github.com/aida94/Transport-App.git
    $ cd Transport-App
    $ npm install

### Start & watch

    $ npm start

### Simple build for production

    $ ng build
    
## Requirements Dependencies  
<li>date-fns</li>
<li>ng-zorro-antd</li>
<li>ngx-webstorage-service</li>


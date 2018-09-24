import Controller from './controller';
import View from './view';

//styles
import main from './styles/main.scss';

//anything that has to do with the dom updating do it through here
let view;

//controller handles the communication to and from the view and store
let controller;

//this will save game information
let store = Build().then((store) => {
    view = new View();
    controller = new Controller(store, view);
    return store;
});



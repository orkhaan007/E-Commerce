import "../src/sass/main.scss";

import { MainController } from "./MVC/controllers/MainController";
import { MainView } from "./MVC/views/MainView";
import { MainModel } from "./MVC/models/MainModel";

const controller = new MainController(new MainModel(), new MainView());
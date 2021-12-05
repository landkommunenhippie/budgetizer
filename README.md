# BudgetizerAngular


Das Projekt soll für die private Haushaltsprüfung dienen. Es ist in Entwicklung und befasst sich vorerst vor allem mit dem Frontend.

Bisher sind folgedendes vorhanden:

* Übersicht über das Jahr
	* Tabelle mit hard gecodetem Datensatz
	* Soll später für genau ein Jahr vohranden sein
	* Füllt Einkommen und Ausgaben automatisch basierend auf den jeweiligen Datensätzen aus
	* Hat Felder für Kontostand zu Beginn/Ende des Monats und für bewusste Sparrücklagen
		* Daraus können sonstige nicht fixe Kosten berechnet werden
* Einkommen
	* Regelmäßiges Einkommen
* Ausgaben
	* Regelmäßige Ausgaben
		* Wird mit jährlichen und monatlichen Angaben möglich sein
		* Der jeweils andere Wert wird dann berechnet

**TBD**
* Unregelmäßige Einnahmen
* Unregelmäßige Ausgaben
* Berechnung der Jahresübersicht
* Anbindung an ein Backend, welches die Daten JSON-formatiert speichert



## Default-Readme

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

